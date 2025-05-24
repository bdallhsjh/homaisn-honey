import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'عسل السدر',
    description: 'من أفضل وأنقى أنواع العسل المشهورة بفوائدها العديدة',
    image: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    link: '/products?type=سدر',
  },
  {
    id: 2,
    name: 'عسل الزهور',
    description: 'عسل متعدد الأزهار بنكهة غنية ومذاق رائع',
    image: 'https://images.pexels.com/photos/248337/pexels-photo-248337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    link: '/products?type=زهور',
  },
  {
    id: 3,
    name: 'عسل الأكاسيا',
    description: 'عسل خفيف ورقيق مع نكهة حلوة ومعتدلة',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    link: '/products?type=أكاسيا',
  }
];

const HoneyCategories = () => {
  return (
    <section className="py-16 bg-amber-50">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">تصفح حسب النوع</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className="group relative rounded-lg overflow-hidden shadow-lg h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white text-sm mb-4 opacity-90">{category.description}</p>
                <span className="inline-block text-white border-b-2 border-primary-500 pb-1 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  اكتشف المزيد
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneyCategories;