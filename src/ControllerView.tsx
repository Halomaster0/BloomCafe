import { useEffect, useState } from 'react';
import { ShoppingBag, Clock, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { supabase } from './lib/supabase';

interface Order {
    id: string;
    table_id: string;
    items: Array<{ name: string, quantity: number, price: number }>;
    total: number;
    created_at: string;
    status: 'pending' | 'preparing' | 'served';
}

const ControllerView = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const loadOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading orders:', error);
        } else {
            setOrders(data || []);
        }
    };

    useEffect(() => {
        loadOrders();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('orders_channel')
            .on(
                'postgres_changes',
                { event: '*', table: 'orders', schema: 'public' },
                () => {
                    loadOrders();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updateStatus = async (orderId: string, newStatus: Order['status']) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating status:', error);
        } else {
            // Optimistic update or just let the subscription handle it
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
    };

    const clearOrders = async () => {
        if (window.confirm('Clear all order history? (Note: This will delete from database)')) {
            const { error } = await supabase
                .from('orders')
                .delete()
                .neq('status', 'not_a_status'); // Hacky way to delete all if no policy prevents it

            if (error) {
                console.error('Error clearing orders:', error);
            } else {
                setOrders([]);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F6F2] p-6 lg:p-12 font-sans text-[#111C16]">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:row items-start md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="bloom-heading text-4xl lg:text-5xl mb-2">Live Orders</h1>
                        <p className="bloom-body text-[#6B7A70]">Monitoring table activity and service flow.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={clearOrders}
                            className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-[#111C16]/10 hover:bg-black/5 transition-colors font-bold text-sm"
                        >
                            Clear History
                        </button>
                        <div className="flex-1 md:flex-none bg-[#013A1E] text-[#F7F6F2] px-6 py-3 rounded-xl flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="font-bold">{orders.filter(o => o.status !== 'served').length} Active</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className={`bloom-card bg-white rounded-[32px] p-8 border border-[#111C16]/5 transition-all ${order.status === 'served' ? 'opacity-60 grayscale' : 'shadow-xl scale-[1.02]'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3 bg-[#013A1E]/5 px-4 py-2 rounded-2xl">
                                    <Hash className="w-4 h-4 text-[#013A1E]" />
                                    <span className="font-black text-xl text-[#013A1E]">{order.table_id}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold">Order ID</p>
                                    <p className="font-mono text-xs">{order.id.split('-')[0]}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-lg bg-[#D4A72C]/20 text-[#111C16] text-[10px] font-black flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                            <span className="bloom-body font-medium">{item.name}</span>
                                        </div>
                                        <span className="text-xs text-[#6B7A70] font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-[#111C16]/5 space-y-2 mb-8">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold">Time</p>
                                    <div className="flex items-center gap-2 text-[#111C16]">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-xs font-bold">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold">Subtotal</p>
                                    <p className="text-sm font-bold text-[#111C16]">${Number(order.total).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold">Tax (13%)</p>
                                    <p className="text-sm font-bold text-[#111C16]">${(Number(order.total) * 0.13).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-[#111C16]/5">
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold">Total</p>
                                    <p className="text-2xl font-black text-[#013A1E]">${(Number(order.total) * 1.13).toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => updateStatus(order.id, 'preparing')}
                                        className="col-span-2 bg-[#111C16] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors font-bold"
                                    >
                                        Start Preparing
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button
                                        onClick={() => updateStatus(order.id, 'served')}
                                        className="col-span-2 bg-[#013A1E] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors font-bold"
                                    >
                                        Complete & Serve
                                        <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                )}
                                {order.status === 'served' && (
                                    <div className="col-span-2 py-4 rounded-2xl border border-[#013A1E]/20 text-[#013A1E] flex items-center justify-center gap-2 font-black text-sm uppercase tracking-tighter">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Order Served
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-[#111C16]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-[#111C16]/20" />
                            </div>
                            <p className="bloom-heading text-2xl text-[#111C16]/30">No active orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ControllerView;
