import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import Button from '../components/button';
import { CheckIcon, PlusIcon } from 'lucide-react';
import MockupImg from '../assets/mockup.png';
import Logo from '../components/logo';
import { useAuth } from '../context/auth-context';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <main className="@container">
      <Navbar />
      <section className="container max-w-7xl py-20 flex justify-between items-center">
        <div className="space-y-9 max-w-[55%] flex flex-col items-start">
          <p className="py-2 px-3 rounded-full border border-gray-500 text-gray-500 text-sm">
            Our new features has been released in v1.0
          </p>
          <div className="space-y-5">
            <h1 className="font-semibold text-gray-800 text-6xl leading-[130%]">
              One Link, Infinite Possibilities
            </h1>
            <p className="text-gray-600 leading-[160%] tracking-[0.8px]">
              Share your social media, website, and content in a single, sleek
              hub. Simplify your online presence and maximize engagement
              effortlessly!
            </p>
          </div>
          <div className="flex space-x-5">
            <Button>Get Started</Button>
            <Button variant="secondary">Try demo</Button>
          </div>
        </div>
        <img src={MockupImg} alt="mockup-image" />
      </section>
      <section className="container max-w-7xl py-20 grid grid-cols-3 gap-9">
        <FeaturesCard
          title="One Link, Unlimited Connections"
          description="Stop juggling multiple links! Share all your important
            content—social media, websites, stores, and more—through a single,
            easy-to-access page."
        />
        <FeaturesCard
          title="🎨 Fully Customizable"
          description="Make it yours! Customize colors, fonts, and layouts to match your brand. Upgrade for advanced themes and even use your own custom domain."
        />
        <FeaturesCard
          title="📊 Smart Analytics & Insights"
          description="Track clicks, visitor stats, and engagement in real-time. Understand your audience and optimize your links for maximum reach and impact."
        />
      </section>
      <section className="container max-w-7xl py-10 flex flex-col items-center">
        <h1 className="font-medium text-4xl mb-11 text-gray-800">
          Pricing Plan
        </h1>
        <ul className="grid grid-cols-2 gap-12">
          <PricingCard title="Free Plan (Forever Free)" price="0" />
          <PricingCard title="Pro Plan" price="4,99" />
        </ul>
      </section>
      <section className="container max-w-7xl py-10 flex flex-col items-center">
        <h1 className="font-medium text-4xl mb-11 text-gray-800">
          Frequently Asked Questions (FAQ)
        </h1>
        <ul className="bg-primary-disabled text-primary px-5 rounded-lg">
          <FaqItem title="What is devlinks?" />
          <FaqItem title="Is there a free plan?" />
          <FaqItem title="Can I customize my page?" />
        </ul>
      </section>
      <section className="container max-w-7xl py-10 flex flex-col items-center">
        <h1 className="font-medium text-5xl mb-4 text-gray-800">
          Start sharing smarter today
        </h1>
        <p className="text-2xl text-gray-500 mb-8">
          Sign up now and turn one link into endless possibilities.
        </p>
        <Button>Get started</Button>
      </section>
      <footer className="bg-[#19103E]">
        <div className="container max-w-7xl py-7 border-b border-b-gray-500">
          <ul className="text-white flex items-center space-x-10">
            <li>Product</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="container max-w-7xl py-7">
          <ul className="text-gray-400 text-sm flex items-center space-x-10">
            <li>&copy; {new Date().getFullYear()} Devlinks</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <nav className="container max-w-7xl flex items-center justify-between py-6">
      <Logo />
      <div className="flex items-center space-x-10 text-lg text-gray-500">
        <Link to="/" className="hover:text-gray-700 transition duration-200">
          Features
        </Link>
        <Link to="/" className="hover:text-gray-700 transition duration-200">
          Pricing
        </Link>
        <Link to="/" className="hover:text-gray-700 transition duration-200">
          FAQ
        </Link>
      </div>
      <div className="flex items-center">
        {auth.isAuthenticated ? (
          <Button onClick={() => navigate({ to: '/links' })}>Dashboard</Button>
        ) : (
          <Button onClick={() => navigate({ to: '/login' })}>Sign in</Button>
        )}
      </div>
    </nav>
  );
}

function FeaturesCard(props: { title: string; description: string }) {
  return (
    <div className="p-5 rounded-xl bg-gray-100 border border-gray-200 space-y-5 place-content-center">
      <h2 className="font-medium text-2xl text-gray-600">{props.title}</h2>
      <p className="leading-[160%] tracking-wide text-gray-500">
        {props.description}
      </p>
    </div>
  );
}

function PricingCard(props: { title: string; price: string }) {
  return (
    <li className="px-8 py-7 border border-gray-300 rounded-xl space-y-6">
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <h3 className="text-3xl font-semibold text-gray-800">
        ${props.price}
        <span className="text-lg text-gray-500 font-medium">/month</span>
      </h3>
      <ul className="space-y-3">
        <li className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-500" />
          <p>Basic link customization</p>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-500" />
          <p>Unlimited links</p>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-500" />
          <p>Analytics for the last 7 days</p>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-500" />
          <p>Social media icons</p>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-500" />
          <p>Mobile-friendly design</p>
        </li>
      </ul>
      <Button className="w-full">Get Started</Button>
    </li>
  );
}

function FaqItem(props: { title: string }) {
  return (
    <li className="py-4 border-b border-b-primary last:border-b-0 max-w-2xl w-xl">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">{props.title}</p>
        <PlusIcon />
      </div>
    </li>
  );
}
