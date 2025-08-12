import { cn } from '@/lib/utils';

const RhombusCard = ({
  backgroundImage,
  className,
  children
}: {
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn(`relative w-full overflow-hidden group cursor-pointer -skew-x-[19deg] z-1`, className)}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className={`absolute inset-0 scale-125 skew-x-[19deg]`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 border-2 border-white " />
      {children}
    </div>
  );
};

export default RhombusCard;
