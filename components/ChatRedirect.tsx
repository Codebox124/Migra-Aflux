"use client";

import { useState } from 'react';
import WhatsAppButton from './WhatsappBtn';


export default function ChatRedirect() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [message, setMessage] = useState('');

    const generateWhatsAppMessage = () => {
        let whatsAppMessage = `Hello Migra Aflux, my name is ${name}.`;

        if (propertyId) {
            whatsAppMessage += ` I'm interested in property ID: ${propertyId}.`;
        }

        if (message) {
            whatsAppMessage += ` ${message}`;
        }

        if (email) {
            whatsAppMessage += ` You can also reach me at ${email}.`;
        }

        return whatsAppMessage;
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-8 text-center">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                        <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.715 1.447h.006c9.6 0 16.16-9.55 12.464-17.946zm-1.64 8.792c-.597 3.223-3.508 5.749-6.963 6.201-1.89.239-3.757-.227-5.298-1.308l-.394-.291-3.992 1.041 1.065-3.874-.32-.422c-1.172-1.562-1.655-3.474-1.352-5.422.638-3.115 3.501-5.497 6.706-5.796l.003-.001c.295 0 .593.018.889.055.794.1 1.573.297 2.297.587.043.02.087.035.132.05l.03.014c.742.358 1.424.827 2.013 1.398 1.051 1.07 1.76 2.437 2.056 3.872.07.3.12.614.152.929.02.231.034.462.04.694v.08z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold">Chat with Our Agents</h2>
                <p className="text-gray-600 mt-2">Fill out the form below to start a conversation on WhatsApp</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email (Optional)</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">Property ID (Optional)</label>
                    <input
                        type="text"
                        id="propertyId"
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. 12345"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                        id="message"

                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="I'm interested in viewing this property..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="pt-2">
                    <WhatsAppButton
                        message={generateWhatsAppMessage()}
                    />
                </div>
            </form>
        </div>
    );
}