"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, FolderPlus, Trash2, Lock, LogOut } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  
  // الأقسام الافتراضية
  const [categories, setCategories] = useState([
    { key: "beans", label: "محاصيل البن" },
    { key: "tools", label: "أدوات الترشيح والتقطير" },
    { key: "accessories", label: "الأكواب والمستلزمات" }
  ]);

  // المنتجات الافتراضية
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "إثيوبيا يرقاتشيف", description: "معالجة مغسولة، إيحاءات فواكه وحمضية لطيفة تناسب التقطير", price: 85, category: "beans" },
    { id: "2", name: "ميزان تيميمور الذكي", description: "ميزان دقيق لقياس القهوة بدقة 0.1 غرام مع مؤقت مدمج", price: 150, category: "tools" },
    { id: "3", name: "كوب سيراميك أنيق", description: "مصنوع يدوياً ويحتفظ بحرارة القهوة لفترة أطول", price: 85, category: "accessories" }
  ]);

  const [activeTab, setActiveTab] = useState<string>("beans");

  // حالات الأمان والـ Authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // بيانات الأدمن السرية (تستطيع تغييرها هنا)
  const ADMIN_EMAIL = "admin@smart-home.com";
  const ADMIN_PASSWORD = "Azzam7700_coffee"; 

  // حالات إضافة البيانات
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatKey, setNewCatKey] = useState("");
  const [newProdName, setNewProdName] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // دالة تسجيل الدخول
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError("");
      setEmail("");
      setPassword("");
    } else {
      setLoginError("المعلومات السرية غير صحيحة! جرب مرة أخرى.");
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel || !newCatKey) return;
    setCategories([...categories, { key: newCatKey.toLowerCase(), label: newCatLabel }]);
    setNewCatLabel("");
    setNewCatKey("");
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    setProducts([...products, {
      id: Date.now().toString(),
      name: newProdName,
      description: newProdDesc,
      price: parseFloat(newProdPrice),
      category: activeTab
    }]);
    setNewProdName(""); setNewProdDesc(""); setNewProdPrice("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A3E3D] font-sans flex flex-col" dir="rtl">
      {/* النابار */}
      <nav className="flex items-center justify-between px-8 py-5 bg-[#F0E5D8] border-b border-[#E3D4C1] sticky top-0 z-50 shadow-sm">
        <div className="text-2xl font-black text-[#5C4033]">المنزل الذكي للقهوة المختصة</div>
        <div className="flex items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`pb-1 font-bold text-sm transition ${
                activeTab === cat.key ? "text-[#5C4033] border-b-2 border-[#5C4033]" : "text-[#8C7A78] hover:text-[#5C4033]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> خروج الأدمن
            </button>
          )}
          <div className="p-2.5 bg-[#E3D4C1] text-[#5C4033] rounded-full cursor-pointer hover:bg-[#D5C2AA] transition">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-14 bg-gradient-to-b from-[#F0E5D8] to-[#FAF6F0]">
        <h1 className="text-[#3A2A29] text-3xl md:text-4xl font-extrabold mb-3">أجواء المقاهي الدافئة في بيتك</h1>
        <p className="text-[#7A6867] max-w-xl mx-auto text-sm leading-relaxed">تصفح أجود محاصيل القهوة المختصة وأدوات الترشيح الذكية بكل راحة وسهولة.</p>
        {isLoggedIn && (
          <div className="mt-4 inline-block bg-green-50 text-green-700 px-4 py-1 rounded-full text-xs font-bold border border-green-200 animate-pulse">
            🔒 أنت الآن في وضع الإدارة (الأدمن)
          </div>
        )}
      </header>

      {/* لوحة التحكم للأدمن - تظهر فقط وعاملاً تسجيل دخول */}
      {isLoggedIn && (
        <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full">
          <div className="bg-[#F5EDE4] p-6 rounded-2xl border border-[#E3D4C1] shadow-sm">
            <h2 className="text-base font-bold text-[#5C4033] mb-4 flex items-center gap-2"><FolderPlus className="w-5 h-5" /> التحكم بالأقسام</h2>
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <input type="text" placeholder="اسم القسم الجديد" value={newCatLabel} onChange={(e) => setNewCatLabel(e.target.value)} className="flex-1 px-3 py-2 bg-white rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" />
              <input type="text" placeholder="رمز فريد (إنجليزي)" value={newCatKey} onChange={(e) => setNewCatKey(e.target.value)} className="flex-1 px-3 py-2 bg-white rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" />
              <button type="submit" className="px-4 py-2 bg-[#5C4033] text-white rounded-xl text-xs font-bold hover:bg-[#463026]">إضافة قسم</button>
            </form>
          </div>

          <div className="bg-[#F5EDE4] p-6 rounded-2xl border border-[#E3D4C1] shadow-sm">
            <h2 className="text-base font-bold text-[#5C4033] mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> إضافة منتج في ({categories.find(c => c.key === activeTab)?.label})</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="اسم المنتج" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="col-span-2 px-3 py-2 bg-white rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" />
              <input type="text" placeholder="الوصف" value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="col-span-2 px-3 py-2 bg-white rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" />
              <input type="number" placeholder="السعر" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="px-3 py-2 bg-white rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" />
              <button type="submit" className="py-2 bg-[#5C4033] text-white rounded-xl text-xs font-bold hover:bg-[#463026]">حفظ المنتج</button>
            </form>
          </div>
        </section>
      )}

      {/* المنتجات */}
      <main className="max-w-7xl mx-auto px-8 pb-20 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.category === activeTab).map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-2xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition relative group">
              {isLoggedIn && (
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-3 left-3 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="w-full h-44 mb-4 bg-[#FAF6F0] rounded-xl flex items-center justify-center text-[#9C8A87] text-xs border border-dashed border-[#E3D4C1]">[ مساحة رفع صورة ]</div>
              <h3 className="text-md font-bold text-[#3A2A29] mb-1">{product.name}</h3>
              <p className="text-xs text-[#7A6867] mb-4 h-8 overflow-hidden">{product.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#FAF6F0]">
                <span className="text-md font-extrabold text-[#5C4033]">{product.price} ر.س</span>
                <button className="px-4 py-1.5 bg-[#F0E5D8] text-[#5C4033] text-xs font-bold rounded-xl hover:bg-[#E3D4C1] transition">إضافة للسلة</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* الفوتر وزر الإدارة المخفي */}
      <footer className="py-6 bg-[#F0E5D8] border-t border-[#E3D4C1] text-center text-xs text-[#8C7A78]">
        <div>جميع الحقوق محفوظة © {new Date().getFullYear()} - المنزل الذكي للقهوة المختصة</div>
        {!isLoggedIn && (
          <button 
            onClick={() => setShowLoginModal(true)} 
            className="mt-2 text-[#5C4033] hover:underline font-bold inline-flex items-center gap-1 opacity-60 hover:opacity-100"
          >
            <Lock className="w-3 h-3" /> لوحة التحكم
          </button>
        )}
      </footer>

      {/* نافذة تسجيل الدخول (Modal) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl border border-[#E3D4C1] max-w-sm w-full mx-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-[#5C4033] mb-2 flex items-center gap-2"><Lock className="w-5 h-5" /> تسجيل دخول الأدمن</h3>
            <p className="text-xs text-[#7A6867] mb-4">أدخل معلوماتك السرية لفتح أزرار تعديل المتجر والأقسام.</p>
            
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#5C4033] mb-1">الإيميل السري</label>
                <input type="email" placeholder="admin@smart-home.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6F0] rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] mb-1">كلمة المرور</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6F0] rounded-xl text-xs border border-[#E3D4C1] focus:outline-none" required />
              </div>
              
              {loginError && <p className="text-xs font-semibold text-red-500">{loginError}</p>}
              
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2 bg-[#5C4033] text-white rounded-xl text-xs font-bold hover:bg-[#463026]">دخول</button>
                <button type="button" onClick={() => { setShowLoginModal(false); setLoginError(""); }} className="px-4 py-2 bg-[#FAF6F0] text-[#7A6867] rounded-xl text-xs font-bold hover:bg-[#F0E5D8]">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}