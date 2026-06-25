"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, FolderPlus, Trash2, Lock, LogOut, Trash, ShoppingBag, Coffee } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("beans");

  // أقسام المتجر بالهوية الجديدة
  const [categories, setCategories] = useState([
    { key: "beans", label: "محاصيل البن الفاخرة" },
    { key: "tools", label: "أدوات التقطير" },
    { key: "accessories", label: "الأكواب والمستلزمات" }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "إثيوبيا يرقاتشيف", description: "معالجة مغسولة، إيحاءات فواكه وحمضية لطيفة تناسب التقطير", price: 85, category: "beans" },
    { id: "2", name: "ميزان تيميمور الذكي", description: "ميزان دقيق لقياس القهوة بدقة 0.1 غرام مع مؤقت مدمج", price: 150, category: "tools" },
    { id: "3", name: "كوب سيراميك أنيق", description: "مصنوع يدوياً ويحتفظ بحرارة القهوة لفترة أطول", price: 85, category: "accessories" }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // نظام الأدمن
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const ADMIN_EMAIL = "admin@smart-home.com";
  const ADMIN_PASSWORD = "Azzam7700_coffee"; 

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setShowCartSidebar(true);
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart(cart.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true); setShowLoginModal(false); setLoginError(""); setEmail(""); setPassword("");
    } else {
      setLoginError("المعلومات السرية غير صحيحة!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#4A433F] font-sans flex flex-col relative" dir="rtl">
      
      {/* 🧭 الهيدر الجديد الفاتح مع اللوقو والأيقونة */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#F2EFEA] sticky top-0 z-40 shadow-xs">
        {/* اللوقو الأنيق المطور برمجياً */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="p-2 bg-[#F7F4F0] text-[#8C7355] rounded-xl group-hover:scale-105 transition duration-200">
            <Coffee className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-black tracking-tight text-[#2B2623] bg-gradient-to-r from-[#2B2623] to-[#8C7355] bg-clip-text text-transparent">رَوقان</span>
        </div>

        {/* الأقسام */}
        <div className="flex items-center gap-8">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveTab(cat.key)} className={`pb-1 font-bold text-xs tracking-wide transition-all ${activeTab === cat.key ? "text-[#8C7355] border-b-2 border-[#8C7355] font-black" : "text-[#A39C97] hover:text-[#8C7355]"}`}>{cat.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-[11px] font-bold hover:bg-red-100 transition"><LogOut className="w-3.5 h-3.5" /> خروج</button>
          )}
          <button onClick={() => setShowCartSidebar(true)} className="p-2.5 bg-[#F7F4F0] text-[#4A433F] rounded-xl hover:bg-[#EFEBE4] transition relative">
            <ShoppingCart className="w-4 h-4" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C7355] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ☕ هيدر ترحيبي هادئ جداً ومريح للعين */}
      <header className="text-center py-16 bg-[#FBF9F6] border-b border-[#F2EFEA]">
        <h1 className="text-[#2B2623] text-3xl font-black mb-2 tracking-tight">كوبٌ يصنع يومك</h1>
        <p className="text-[#948C85] text-xs max-w-md mx-auto leading-relaxed">متجرك المتكامل لأجود أنواع محاصيل البن وأدوات التقطير الفاخرة التي تمنحك تجربة المقهى في منزلك.</p>
      </header>

      {/* عرض المنتجات بشبكة نظيفة بيضاء */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.category === activeTab).map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-2xl border border-[#F0EFEA] hover:border-[#E5E2DA] transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-full h-48 mb-4 bg-[#FBF9F6] rounded-xl flex items-center justify-center text-[#B2A9A1] text-xs border border-[#F2EFEA] font-medium">[ صورة المنتج ]</div>
                <h3 className="text-sm font-bold text-[#2B2623] mb-1">{product.name}</h3>
                <p className="text-xs text-[#948C85] mb-4 h-8 overflow-hidden leading-relaxed">{product.description}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#FBF9F6]">
                <span className="text-sm font-black text-[#2B2623]">{product.price} ر.س</span>
                <button onClick={() => addToCart(product)} className="px-4 py-1.5 bg-[#2B2623] text-white text-xs font-bold rounded-xl hover:bg-[#423B37] transition duration-200">إضافة للسلة</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 🛒 جانب السلة المنبثق بتصميم أوف وايت فاخر */}
      {showCartSidebar && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 flex justify-left animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-200" dir="rtl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2EFEA]">
              <h3 className="text-md font-black text-[#2B2623] flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> سلة المشتريات</h3>
              <button onClick={() => setShowCartSidebar(false)} className="text-xs font-bold text-[#A39C97] hover:text-[#2B2623]">إغلاق ×</button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-xs text-[#A39C97]">سلتك فارغة حالياً..</div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between bg-[#FBF9F6] p-3 rounded-xl border border-[#F2EFEA]">
                    <div>
                      <h4 className="text-xs font-bold text-[#2B2623]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#8C7355] font-bold mt-0.5">{item.product.price * item.quantity} ر.س</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="w-6 h-6 bg-white rounded-lg border text-xs font-bold flex items-center justify-center">-</button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="w-6 h-6 bg-white rounded-lg border text-xs font-bold flex items-center justify-center">+</button>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-red-500 rounded-lg mr-1"><Trash className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-[#F2EFEA] space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span>المجموع الكلي:</span>
                <span className="text-sm font-black text-[#2B2623]">{cartTotal} ر.س</span>
              </div>
              <button onClick={() => alert(`سيتم نقلك لبوابة الدفع لإتمام مبلغ ${cartTotal} ر.س عبر Apple Pay قريباً!`)} disabled={cart.length === 0} className="w-full py-3 bg-black text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-900 transition disabled:opacity-40">
                 Pay الشراء عبر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className="py-6 bg-[#FBF9F6] border-t border-[#F2EFEA] text-center text-[11px] text-[#A39C97]">
        <div>جميع الحقوق محفوظة © {new Date().getFullYear()} - رَوقان للقهوة المختصة</div>
        {!isLoggedIn && <button onClick={() => setShowLoginModal(true)} className="mt-1 text-[#8C7355] font-bold text-[10px] opacity-40 hover:opacity-100">💻 الإدارة</button>}
      </footer>

      {/* مودال الأدمن */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl border border-[#F2EFEA] max-w-xs w-full mx-4 shadow-xl">
            <h3 className="text-sm font-black text-[#2B2623] mb-3 flex items-center gap-2"><Lock className="w-4 h-4" /> دخول الأدمن</h3>
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="email" placeholder="الإيميل" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-[#FBF9F6] rounded-xl text-xs border border-[#F2EFEA] focus:outline-none" required />
              <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-[#FBF9F6] rounded-xl text-xs border border-[#F2EFEA] focus:outline-none" required />
              {loginError && <p className="text-[10px] font-bold text-red-500">{loginError}</p>}
              <div className="flex gap-2 pt-1">
                <button type="submit" className="flex-1 py-2 bg-black text-white rounded-xl text-xs font-bold">دخول</button>
                <button type="button" onClick={() => { setShowLoginModal(false); setLoginError(""); }} className="px-3 py-2 bg-[#FBF9F6] text-[#A39C97] rounded-xl text-xs font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}