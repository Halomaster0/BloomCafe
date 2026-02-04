import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    ChevronRight,
    Hash,
    Calendar,
    MessageSquare,
    User,
    Mail,
    Trash2,
    Check
} from 'lucide-react';
import { supabase } from './lib/supabase';

type TabType = 'orders' | 'reservations' | 'messages';

interface Order {
    id: string;
    table_id: string;
    items: Array<{ name: string, quantity: number, price: number }>;
    total: number;
    created_at: string;
    status: 'pending' | 'preparing' | 'served';
}

interface Reservation {
    id: string;
    name: string;
    email: string;
    guests: number;
    date: string;
    time: string;
    status: string;
    created_at: string;
}

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

const ControllerView = () => {
    const [activeTab, setActiveTab] = useState<TabType>('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (silent = false) => {
        if (!silent) setIsLoading(true);

        const [ordersRes, reservationsRes, messagesRes] = await Promise.all([
            supabase.from('orders').select('*').order('created_at', { ascending: false }),
            supabase.from('reservations').select('*').order('date', { ascending: true }),
            supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
        ]);

        if (ordersRes.data) setOrders(ordersRes.data);
        if (reservationsRes.data) setReservations(reservationsRes.data);
        if (messagesRes.data) setMessages(messagesRes.data);

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        // Real-time subscriptions
        const ordersSub = supabase.channel('orders_realtime').on('postgres_changes' as any, { event: '*', table: 'orders', schema: 'public' }, () => fetchData(true)).subscribe();
        const reservationsSub = supabase.channel('reservations_realtime').on('postgres_changes' as any, { event: '*', table: 'reservations', schema: 'public' }, () => fetchData(true)).subscribe();
        const messagesSub = supabase.channel('messages_realtime').on('postgres_changes' as any, { event: '*', table: 'contact_messages', schema: 'public' }, () => fetchData(true)).subscribe();

        return () => {
            supabase.removeChannel(ordersSub);
            supabase.removeChannel(reservationsSub);
            supabase.removeChannel(messagesSub);
        };
    }, []);

    const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
        // Optimistic update for immediate feedback
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
        if (error) {
            console.error('Error updating order:', error);
            fetchData(true); // Revert on error
        }
    };

    const deleteReservation = async (id: string) => {
        if (window.confirm('Cancel this reservation?')) {
            await supabase.from('reservations').delete().eq('id', id);
            // Subscription will handle refresh
        }
    };

    const markMessageRead = async (id: string) => {
        // Optimistic update
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
        await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    };

    const clearOrders = async () => {
        if (window.confirm('Clear all orders? This cannot be undone.')) {
            const { error } = await supabase.from('orders').delete().neq('status', 'not_a_status');
            if (error) console.error(error);
            else setOrders([]);
        }
    };

    const clearReservations = async () => {
        if (window.confirm('Clear all bookings? This cannot be undone.')) {
            const { error } = await supabase.from('reservations').delete().neq('status', 'not_a_status');
            if (error) console.error(error);
            else setReservations([]);
        }
    };

    const clearMessages = async () => {
        if (window.confirm('Clear all messages? This cannot be undone.')) {
            const { error } = await supabase.from('contact_messages').delete().neq('email', 'not_an_email');
            if (error) console.error(error);
            else setMessages([]);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F6F2] font-sans text-[#111C16]">
            <div className="max-w-7xl mx-auto p-6 lg:p-12">
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full justify-between">
                        <div>
                            <h1 className="bloom-heading text-4xl lg:text-5xl mb-2">Staff Hub</h1>
                            <p className="bloom-body text-[#6B7A70]">Your central inbox for everything Bloom.</p>
                        </div>

                        {activeTab === 'orders' && orders.length > 0 && (
                            <button onClick={clearOrders} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                                <Trash2 className="w-3 h-3" /> Clear Orders
                            </button>
                        )}
                        {activeTab === 'reservations' && reservations.length > 0 && (
                            <button onClick={clearReservations} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                                <Trash2 className="w-3 h-3" /> Clear Bookings
                            </button>
                        )}
                        {activeTab === 'messages' && messages.length > 0 && (
                            <button onClick={clearMessages} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                                <Trash2 className="w-3 h-3" /> Clear Inbox
                            </button>
                        )}
                    </div>

                    <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-black/5 self-stretch md:self-auto flex-shrink-0">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'orders' ? 'bg-[#013A1E] text-white shadow-lg' : 'hover:bg-black/5'
                                }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Orders
                            {orders.filter(o => o.status !== 'served').length > 0 && (
                                <span className="w-5 h-5 bg-[#D4A72C] text-[#111C16] text-[10px] rounded-full flex items-center justify-center animate-pulse">
                                    {orders.filter(o => o.status !== 'served').length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('reservations')}
                            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'reservations' ? 'bg-[#013A1E] text-white shadow-lg' : 'hover:bg-black/5'
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Bookings
                            {reservations.length > 0 && (
                                <span className="bg-black/10 px-2 py-0.5 rounded-lg text-[10px]">{reservations.length}</span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'messages' ? 'bg-[#013A1E] text-white shadow-lg' : 'hover:bg-black/5'
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Inbox
                            {messages.filter(m => !m.is_read).length > 0 && (
                                <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                    {messages.filter(m => !m.is_read).length}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                <main>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-[#013A1E]/10 border-t-[#013A1E] rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {activeTab === 'orders' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className={`bloom-card bg-white rounded-[32px] p-8 border border-[#111C16]/5 transition-all ${order.status === 'served' ? 'opacity-60 grayscale' : 'shadow-xl scale-[1.01]'}`}>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="bg-[#013A1E]/5 px-4 py-2 rounded-2xl flex items-center gap-3">
                                                    <Hash className="w-4 h-4 text-[#013A1E]" />
                                                    <span className="font-black text-xl text-[#013A1E]">{order.table_id}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-[#6B7A70]">{order.id.split('-')[0]}</span>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center text-sm font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-6 h-6 bg-[#D4A72C]/20 rounded-lg flex items-center justify-center text-[10px] font-black">{item.quantity}</span>
                                                            {item.name}
                                                        </div>
                                                        <span className="text-xs text-[#6B7A70]">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-6 border-t border-black/5 mb-8">
                                                <div className="flex justify-between text-xs text-[#6B7A70] mb-2 font-bold uppercase tracking-widest">
                                                    <span>Placed At</span>
                                                    <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="flex justify-between text-2xl font-black text-[#013A1E]">
                                                    <span>Total</span>
                                                    <span>${(Number(order.total) * 1.13).toFixed(2)}</span>
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                {order.status === 'pending' && (
                                                    <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="bg-[#111C16] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors">
                                                        Start Prep <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {order.status === 'preparing' && (
                                                    <button onClick={() => updateOrderStatus(order.id, 'served')} className="bg-[#013A1E] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors">
                                                        Serve Order <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {order.status === 'served' && (
                                                    <div className="py-4 border border-[#013A1E]/20 text-[#013A1E] text-center rounded-2xl font-black text-xs uppercase">Order Served</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length === 0 && <div className="col-span-full text-center py-20 text-[#6B7A70]">No orders found.</div>}
                                </div>
                            )}

                            {activeTab === 'reservations' && (
                                <div className="space-y-4">
                                    {reservations.map((res) => (
                                        <div key={res.id} className="bg-white rounded-3xl p-6 border border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-6 w-full md:w-auto">
                                                <div className="w-16 h-16 bg-[#013A1E]/5 rounded-2xl flex flex-col items-center justify-center text-[#013A1E]">
                                                    <span className="text-[10px] font-bold uppercase">{new Date(res.date).toLocaleString('default', { month: 'short' })}</span>
                                                    <span className="text-xl font-black">{new Date(res.date).getDate()}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg">{res.name}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-[#6B7A70]">
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {res.time.slice(0, 5)}</span>
                                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {res.guests} Guests</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 w-full md:w-auto">
                                                <a href={`mailto:${res.email}`} className="flex-1 md:flex-none border border-black/10 h-12 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-black/5 transition-colors text-sm font-bold">
                                                    <Mail className="w-4 h-4" /> Email
                                                </a>
                                                <button onClick={() => deleteReservation(res.id)} className="w-12 h-12 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {reservations.length === 0 && <div className="text-center py-20 text-[#6B7A70]">No bookings scheduled.</div>}
                                </div>
                            )}

                            {activeTab === 'messages' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`bg-white rounded-[32px] p-8 border border-black/5 transition-all ${!msg.is_read ? 'shadow-xl ring-2 ring-[#D4A72C]' : 'opacity-80'}`}>
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="font-black text-xl mb-1">{msg.name}</h3>
                                                    <span className="text-xs text-[#6B7A70] flex items-center gap-1 font-mono"><Mail className="w-3 h-3" /> {msg.email}</span>
                                                </div>
                                                <span className="text-[10px] text-[#6B7A70]">{new Date(msg.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="bloom-body text-sm text-[#111C16] mb-8 leading-relaxed bg-[#F7F6F2] p-6 rounded-2xl italic">"{msg.message}"</p>
                                            <div className="flex justify-end">
                                                {!msg.is_read ? (
                                                    <button onClick={() => markMessageRead(msg.id)} className="bg-[#013A1E] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors">
                                                        Mark Done <Check className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <div className="text-[#013A1E] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                        <CheckCircle2 className="w-4 h-4" /> Message Resolved
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length === 0 && <div className="col-span-full text-center py-20 text-[#6B7A70]">No messages found.</div>}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ControllerView;
