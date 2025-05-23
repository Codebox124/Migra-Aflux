import CategoryList from '@/components/CategoryList';
import PropertyList from '@/components/PropertiesList';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">

      <section
        className="relative h-screen bg-cover bg-center text-white flex items-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >

        <div className="absolute inset-0 bg-black opacity-60"></div>


        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Find Your Perfect Home with Migra Aflux
            </h1>
            <p className="text-xl mb-8">
              Discover exclusive properties and marketplace items — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                Browse Properties
              </Link>
              <Link
                href="/marketplace"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>




      <section className="py-20 text-black bg-gray-50">
        <div className="container mx-auto  px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Featured Apartment</h2>
          <PropertyList featured={true} limit={3} />
          <div className="text-center mt-10">
            <Link href="/properties" className="text-blue-700 font-semibold hover:underline">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>


      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Marketplace Categories</h2>
          <CategoryList />
          <Link href="/marketplace">
            <div className='text-center mt-10'>
              <span className="text-blue-600  inline-flex items-center group-hover:translate-x-1 transition-transform">
                Browse Marketplace
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div></Link>
        </div>
      </section>

      {/* Chat Support */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Assistance?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Our expert agents are here to help you find the perfect home. Get in touch with us on WhatsApp for personalized support.
          </p>
          <Link
            href="/chat"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
              <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.715 1.447h.006c9.6 0 16.16-9.55 12.464-17.946zm-1.64 8.792c-.597 3.223-3.508 5.749-6.963 6.201-1.89.239-3.757-.227-5.298-1.308l-.394-.291-3.992 1.041 1.065-3.874-.32-.422c-1.172-1.562-1.655-3.474-1.352-5.422.638-3.115 3.501-5.497 6.706-5.796l.003-.001c.295 0 .593.018.889.055.794.1 1.573.297 2.297.587.043.02.087.035.132.05l.03.014c.742.358 1.424.827 2.013 1.398 1.051 1.07 1.76 2.437 2.056 3.872.07.3.12.614.152.929.02.231.034.462.04.694v.08z" />
            </svg>
            Chat with an Agent
          </Link>
        </div>
      </section>
    </main>
  );
}
