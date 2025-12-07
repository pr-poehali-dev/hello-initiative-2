import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const reviews = [
    { name: 'Анна К.', text: 'Отличный магазин! Быстрая доставка, качественные товары.', rating: 5 },
    { name: 'Дмитрий М.', text: 'Заказывал наушники - пришли быстро, звук отличный!', rating: 5 },
    { name: 'Елена С.', text: 'Всё понравилось, буду заказывать ещё.', rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopHub
            </h1>
            <nav className="hidden md:flex gap-8">
              {['home', 'catalog', 'about', 'delivery', 'contacts', 'reviews'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-semibold transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О нас'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакты'}
                  {section === 'reviews' && 'Отзывы'}
                </button>
              ))}
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Корзина пуста</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <Card key={item.id} className="hover-scale">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="text-4xl">{item.image}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-primary font-bold">{item.price} ₽</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={16} />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={16} />
                              </Button>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-xl font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                          <Icon name="ArrowRight" size={20} className="ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <>
            <section className="mb-20 animate-fade-in">
              <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    Технологии будущего уже здесь
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">
                    Откройте для себя мир инноваций с нашими гаджетами премиум-класса
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 hover-scale"
                    onClick={() => setActiveSection('catalog')}
                  >
                    Смотреть каталог
                    <Icon name="Sparkles" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-4xl font-black mb-8">Популярные товары</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product, index) => (
                  <Card
                    key={product.id}
                    className="hover-scale cursor-pointer overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center relative">
                        <span className="text-7xl">{product.image}</span>
                        {product.badge && (
                          <Badge className="absolute top-4 right-4 bg-accent">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-3xl font-black text-primary mb-4">{product.price} ₽</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-black mb-8">Каталог товаров</h2>
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="audio">Аудио</TabsTrigger>
                <TabsTrigger value="gadgets">Гаджеты</TabsTrigger>
                <TabsTrigger value="accessories">Аксессуары</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover-scale cursor-pointer overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center relative">
                          <span className="text-7xl">{product.image}</span>
                          {product.badge && (
                            <Badge className="absolute top-4 right-4 bg-accent">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-3xl font-black text-primary mb-4">{product.price} ₽</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product)}
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              {['audio', 'gadgets', 'accessories'].map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.category === category).map((product) => (
                      <Card key={product.id} className="hover-scale cursor-pointer overflow-hidden">
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center relative">
                            <span className="text-7xl">{product.image}</span>
                            {product.badge && (
                              <Badge className="absolute top-4 right-4 bg-accent">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-3xl font-black text-primary mb-4">{product.price} ₽</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            onClick={() => addToCart(product)}
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="animate-fade-in max-w-3xl">
            <h2 className="text-4xl font-black mb-8">О магазине</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  ShopHub — это современный интернет-магазин электроники и гаджетов, 
                  который предлагает только качественные и проверенные товары.
                </p>
                <p className="text-lg mb-4">
                  Мы работаем с 2020 года и за это время завоевали доверие более 10 000 клиентов. 
                  Наша миссия — делать технологии доступными для каждого.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <p className="font-bold text-2xl text-primary">10K+</p>
                    <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <p className="font-bold text-2xl text-primary">24ч</p>
                    <p className="text-sm text-muted-foreground">Быстрая доставка</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <p className="font-bold text-2xl text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Гарантия качества</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="animate-fade-in max-w-3xl">
            <h2 className="text-4xl font-black mb-8">Доставка и оплата</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🚚</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Способы доставки</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Курьерская доставка по Москве — 300 ₽</li>
                        <li>• Доставка по России (CDEK) — от 400 ₽</li>
                        <li>• Самовывоз из пункта выдачи — бесплатно</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💳</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Способы оплаты</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Банковская карта онлайн</li>
                        <li>• Наличные при получении</li>
                        <li>• Безопасные платежные системы</li>
                        <li>• Полная защита данных</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="animate-fade-in max-w-3xl">
            <h2 className="text-4xl font-black mb-8">Контакты</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <a href="tel:+79991234567" className="text-lg text-primary hover:underline">
                        +7 (999) 123-45-67
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="Mail" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@shophub.ru" className="text-lg text-primary hover:underline">
                        info@shophub.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-lg">г. Москва, ул. Тверская, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-lg">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="animate-fade-in max-w-3xl">
            <h2 className="text-4xl font-black mb-8">Отзывы клиентов</h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Card key={index} className="hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                        {review.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{review.name}</h3>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

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
