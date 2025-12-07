import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  animationDelay?: number;
}

const ProductCard = ({ product, onAddToCart, animationDelay }: ProductCardProps) => {
  return (
    <Card
      className="hover-scale cursor-pointer overflow-hidden animate-scale-in"
      style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
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
          onClick={() => onAddToCart(product)}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
