import BgGradient from '@/components/common/bg-gradient';
import ScrollToTopButton from '@/components/common/scroll-to-top-button';
import ToastPlacer from '@/components/common/toast-placer';
import CTASection from '@/components/home/cta-section';
import DemoSection from '@/components/home/demo-section';
import HeroSection from '@/components/home/hero-section';
import HowItWorksSection from '@/components/home/how-it-works-section';
import PricingSection from '@/components/home/pricing-section';

export default async function Home() {
	return (
		<div className="relative w-full">
			<BgGradient />

			<div className="flex flex-col">
				<HeroSection />

				<DemoSection />

				<HowItWorksSection />

				<PricingSection />

				<CTASection />
			</div>
      <ScrollToTopButton />
		</div>
	);
}
