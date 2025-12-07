import { useState } from 'react';
import Header from '@/components/Header';
import ContentSections from '@/components/ContentSections';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Беспроводные наушники', price: 4990, category: 'audio', image: '🎧', badge: 'ХИТ' },
    { id: 2, name: 'Умные часы', price: 12990, category: 'gadgets', image: '⌚', badge: 'НОВИНКА' },
    { id: 3, name: 'Портативная колонка', price: 2990, category: 'audio', image: '🔊' },
    { id: 4, name: 'Фитнес-браслет', price: 3490, category: 'gadgets', image: '💪' },
    { id: 5, name: 'Внешний аккумулятор', price: 1990, category: 'accessories', image: '🔋', badge: 'СКИДКА' },
    { id: 6, name: 'Беспроводная мышь', price: 1490, category: 'accessories', image: '🖱️' },
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <ContentSections
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        products={products}
        addToCart={addToCart}
      />
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ShopHub
              </h3>
              <p className="text-gray-400">
                Ваш надежный магазин электроники и гаджетов
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-white">Каталог</button></li>
                <li><button onClick={() => setActiveSection('about')} className="hover:text-white">О нас</button></li>
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-white">Доставка</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-white">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (999) 123-45-67</li>
                <li>info@shophub.ru</li>
                <li>г. Москва, ул. Тверская, д. 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ShopHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
