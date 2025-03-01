import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import IconChat from '../../assets/images/icon-chat.png';
import IconMoney from "../../assets/images/icon-money.png";
import IconSecurity from "../../assets/images/icon-security.png";
import './home.css';

const Home = () => {
    const featuresData = [
        {
          icon: IconChat,
          title: "You are our #1 priority",
          description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
          icon: IconMoney,
          title: "More savings means higher rates",
          description: "The more you save with us, the higher your interest rate will be!"
        },
        {
          icon: IconSecurity,
          title: "Security you can trust",
          description: "We use top of the line encryption to make sure your data and money is always safe."
        }
      ];

    return (
      <div className="body-container">
        <Header />
        <Banner />
        <div className='features'>
            <h2 className="sr-only">Features</h2>
            {featuresData.map((item, index) => (
                <FeatureCard 
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
            />
            ))}
        </div>
        <Footer />
      </div>
    );
  };
  
export default Home;