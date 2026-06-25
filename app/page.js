"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, FolderPlus } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState([
    { key: "beans", label: "محاصيل البن" },
    { key: "tools", label: "أدوات الترشيح" },
    { key: "accessories", label: "الأكواب والمستلزمات" }
  ]);
  const [products, setProducts] = useState([
    { id: "1", name: "إثيوبيا يرقاتشيف", description: "معالجة مغسولة، إيحاءات فواكه وحمضية لطيفة", price: 85, category: "beans" },
    { id: "2", name: "ميزان تيميمور الذكي", description: "ميزان دقيق لقياس القهوة بدقة 0.1 غرام مع مؤقت مدمج", price: 150, category: "tools" }
  ]);
  const [activeTab, setActiveTab] = useState("beans");
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatKey, setNewCatKey] = useState("");
  const [newProdName, setNewProdName] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatLabel || !newCatKey) return;
    setCategories([...categories, { key: newCatKey, label: newCatLabel }]);
    setNewCatLabel(""); setNewCatKey("");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    setProducts([...products, { id: Date.now().toString(), name: newProdName, description: newProdDesc, price: parseFloat(newProdPrice), category: activeTab }]);
    setNewProdName(""); setNewProdDesc(""); setNewProdPrice("");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3E332E]" dir="rtl">
      <nav className="flex items-center justify-between px-8 py-4 bg-[#F5EFE6] border-b border-[#E8DFD8] sticky top-0 z-50">
        <div className="text-2xl font-bold text-[#6F4E37]">المنزل الذكي للقهوة المختصة</div>
        <div className="flex gap-6">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveTab(cat.key)} className={`pb-1 font-semibold transition ${activeTab === cat.key ? "text-[#6F4E37] border-b-2 border-[#6F4E37]" : "text-[#8C7A6B]"}`}>{cat.label}</button>
          ))}
        </div>
        <ShoppingCart className="w-6 h-6 text-[#6F4E37]" />
      </nav>

      <header className="text-center py-12 bg-[#F5EFE6] border-b border-[#E8DFD8]">
        <h1 className="text-3xl font-black text-[#3E332E] mb-2">أجواء المقاهي الدافئة في منزلك</h1>
        <p className="text-[#7A6B61] text-sm">تصفح وأضف أدوات ومحاصيل القهوة المفضلة لديك بنقرة واحدة.</p>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#E8DFD8]">
          <h2 className="text-lg font-bold text-[#6F4E37] mb-4 flex items-center gap-2"><FolderPlus /> إضافة قسم جديد</h2>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input type="text" placeholder="اسم القسم" value={newCatLabel} onChange={(e) => setNewCatLabel(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
            <input type="text" placeholder="الرمز بالإنجليزية" value={newCatKey} onChange={(e) => setNewCatKey(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
            <button type="submit" className="px-4 py-2 bg-[#6F4E37] text-white rounded-lg text-sm font-semibold">إضافة</button>
          </form>
        </div>

        <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#E8DFD8]">
          <h2 className="text-lg font-bold text-[#6F4E37] mb-4 flex items-center gap-2"><Plus /> إضافة منتج في القسم الحالي</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="اسم المنتج" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="col-span-2 px-3 py-2 border rounded-lg text-sm" />
            <input type="text" placeholder="وصف المنتج" value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="col-span-2 px-3 py-2 border rounded-lg text-sm" />
            <input type="number" placeholder="السعر" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="px-3 py-2 border rounded-lg text-sm" />
            <button type="submit" className="py-2 bg-[#6F4E37] text-white rounded-lg text-sm font-semibold">حفظ المنتج</button>
          </form>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.category === activeTab).map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-xl border border-[#E8DFD8]">
              <div className="w-full h-40 mb-4 bg-[#FAF6F0] rounded-lg flex items-center justify-center text-[#8C7A6B] text-xs border border-dashed border-[#E8DFD8]">[ مساحة مخصصة للصورة ]</div>
              <h3 className="text-lg font-bold text-[#3E332E] mb-1">{product.name}</h3>
              <p className="text-xs text-[#7A6B61] mb-4 h-8">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-md font-bold text-[#6F4E37]">{product.price} ر.س</span>
                <button className="px-3 py-1.5 bg-[#F5EFE6] text-[#6F4E37] text-xs font-bold rounded-lg">إضافة للسلة</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}