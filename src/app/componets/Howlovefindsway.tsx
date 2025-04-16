import { Heart, MessageCircle, Calendar, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Will <span className="text-rose-500">Love</span> Find Your Way?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple process helps you find meaningful connections that last.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100 p-3 rounded-full mr-4">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Choose Partner</h2>
            </div>
            <p className="text-gray-600">
              Set up your account, provide detailed information, and find a partner that matches your interests.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MessageCircle className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Send Message</h2>
            </div>
            <p className="text-gray-600">
              Once you get a match, don&#39;t be shy; it&#39;s your time to shine. Get in touch for a fun conversation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Go On A Date</h2>
            </div>
            <p className="text-gray-600">
              After that, why not go on a date? When everything goes well, live happily ever after.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Still confused? Don&#39;t worry, we&#39;ve got your back.
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our in-depth documentation – or simply get in touch with our support team for more help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="border-rose-300 text-rose-500 hover:bg-rose-50">
              Learn More
            </Button>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              Video Tutorial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}