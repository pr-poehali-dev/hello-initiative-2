import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

interface ContentSectionsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  products: Product[];
  addToCart: (product: Product) => void;
}

const ContentSections = ({ activeSection, setActiveSection, products, addToCart }: ContentSectionsProps) => {
  const reviews = [
    { name: 'Анна К.', text: 'Отличный магазин! Быстрая доставка, качественные товары.', rating: 5 },
    { name: 'Дмитрий М.', text: 'Заказывал наушники - пришли быстро, звук отличный!', rating: 5 },
    { name: 'Елена С.', text: 'Всё понравилось, буду заказывать ещё.', rating: 4 },
  ];

  return (
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
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  animationDelay={index * 100}
                />
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </TabsContent>
            {['audio', 'gadgets', 'accessories'].map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === category).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
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
  );
};

export default ContentSections;
