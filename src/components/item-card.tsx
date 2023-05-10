import Image from 'next/image';
import { CURRENCY } from 'helpers/constants';
import {
  ItemCardBase,
  ItemCardImage,
  ItemCardContent,
  ItemCardPrice,
} from './utils/theme';

interface ItemProps {
  image: string;
  name: string;
  price: number;
}

interface ItemCardProps {
  item: ItemProps;
  onClick?: (e: any) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div className={ItemCardBase} onClick={onClick}>
      <div className={ItemCardImage}>
        <Image
          src={item.image}
          alt={'Alt ' + item.name}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={item.image}
        />
      </div>

      <div className={ItemCardContent}>
        <span className={ItemCardPrice}>
          {CURRENCY}
          {item.price}
        </span>
        <span className="text-13px">{item.name}</span>
      </div>
    </div>
  );
}
