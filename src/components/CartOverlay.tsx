import React, { useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../CartContext';

const CartOverlay: React.FC = () => {
    const {
        cart,
        subtotal,
        updateQuantity,
        removeFromCart,
        isCartModalOpen,
        setIsCartModalOpen,
        isMenuOpen,
        placeOrder
    } = useCart();

    const [isOrderPlaced, setIsOrderPlaced] = React.useState(false);
    const [tableId, setTableId] = React.useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const table = params.get('table');
        if (table) setTableId(table);
    }, []);

    // Body scroll lock for cart modal
    useEffect(() => {
        if (isCartModalOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!isMenuOpen) {
            document.body.style.overflow = 'unset';
        }
    }, [isCartModalOpen, isMenuOpen]);

    const handleConfirmOrder = () => {
        placeOrder(tableId || 'Walk-in');
        setIsCartModalOpen(false);
        setIsOrderPlaced(true);
        setTimeout(() => setIsOrderPlaced(false), 5000);
    };

    const taxAmount = subtotal * 0.13;
    const finalTotal = subtotal + taxAmount;

    if (cart.length === 0 && !isOrderPlaced) return null;

    return (
        <>
            {/* Sticky Cart Bar */}
            {cart.length > 0 && !isMenuOpen && !isCartModalOpen && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5500] w-[min(92vw,480px)]">
                    <div className="bg-[#111C16] text-[#F7F6F2] p-5 lg:p-6 rounded-[32px] shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center gap-5">
                            <div className="relative bg-[#D4A72C] p-3 rounded-2xl shadow-lg">
                                <ShoppingBag className="w-6 h-6 text-[#111C16]" />
                                <span className="absolute -top-2 -right-2 bg-white text-[#111C16] text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#111C16]">
                                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Current Order</p>
                                <p className="bloom-body text-xl font-bold font-mono tracking-tight">${subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsCartModalOpen(true)}
                            className="bg-[#F7F6F2] text-[#111C16] px-8 py-4 rounded-2xl text-sm font-black hover:bg-[#D4A72C] transition-all transform active:scale-95 shadow-lg"
                        >
                            View Order
                        </button>
                    </div>
                </div>
            )}

            {/* Cart Management Modal */}
            {isCartModalOpen && (
                <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-[#013A1E]/70 backdrop-blur-md p-4 lg:p-8 animate-in fade-in duration-300">
                    <div className="bg-[#F7F6F2] w-full max-w-2xl h-[80vh] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-500">
                        <button
                            onClick={() => setIsCartModalOpen(false)}
                            className="absolute top-8 right-8 z-10 p-3 rounded-full bg-[#111C16]/5 hover:bg-[#111C16]/10 transition-colors"
                        >
                            <X className="w-6 h-6 text-[#111C16]" />
                        </button>

                        <div className="p-8 lg:p-10 border-b border-[#013A1E]/5">
                            <h3 className="bloom-heading text-3xl text-[#111C16]">Your Order</h3>
                            <p className="bloom-body text-sm text-[#6B7A70] mt-1">Table {tableId || 'Confirming...'}</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-6">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center group bg-white p-5 rounded-[24px] border border-[#111C16]/5 shadow-sm">
                                    <div className="flex-1">
                                        <h5 className="bloom-body font-bold text-[#111C16]">{item.name}</h5>
                                        <p className="text-xs text-[#013A1E] font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-[#F7F6F2] p-2 rounded-2xl border border-[#111C16]/5">
                                        <button
                                            onClick={() => updateQuantity(item.name, -1)}
                                            className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#111C16] hover:bg-[#D4A72C] transition-colors shadow-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="bloom-body font-black text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.name, 1)}
                                            className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#111C16] hover:bg-[#D4A72C] transition-colors shadow-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.name)}
                                        className="ml-6 p-2 text-[#6B7A70] hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 lg:p-10 bg-white border-t border-[#013A1E]/5 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <p className="text-[#6B7A70] font-medium uppercase tracking-wider">Subtotal</p>
                                    <p className="font-bold text-[#111C16]">${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <p className="text-[#6B7A70] font-medium uppercase tracking-wider">Tax (13%)</p>
                                    <p className="font-bold text-[#111C16]">${taxAmount.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-[#111C16]/5">
                                    <p className="bloom-heading text-xl text-[#111C16]">Total</p>
                                    <p className="bloom-body text-2xl font-black text-[#013A1E]">${finalTotal.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleConfirmOrder}
                                className="w-full bg-[#013A1E] text-[#F7F6F2] py-5 rounded-2xl text-lg font-black hover:bg-[#D4A72C] hover:text-[#111C16] transition-all transform active:scale-95 shadow-xl"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Notification */}
            {isOrderPlaced && (
                <div className="fixed inset-x-0 top-12 z-[7000] flex justify-center px-6 pointer-events-none animate-in slide-in-from-top-12 fade-in duration-500">
                    <div className="bg-[#013A1E] text-[#F7F6F2] px-8 py-5 rounded-full shadow-2xl flex items-center gap-4 border border-white/10">
                        <CheckCircle2 className="w-6 h-6 text-[#D4A72C]" />
                        <p className="bloom-body font-bold tracking-tight">Order sent to the kitchen! Table {tableId || 'Confirmed'}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartOverlay;
