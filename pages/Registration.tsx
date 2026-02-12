import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Clock, Mail, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { COURSES } from '../utils/csvParser';
import { Course, RegistrationFormData } from '../types';

export const Registration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const found = COURSES.find(c => c.id === id);
    if (found) {
      setCourse(found);
    } else {
      // Handle not found
      navigate('/');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    setFormStatus('submitting');

    setTimeout(() => {
      // Construct mailto link
      const subject = encodeURIComponent(`Registration Request: ${course.title}`);
      const body = encodeURIComponent(
        `Dear Organizer,\n\nI would like to register for the event: ${course.title} (${course.startDate}).\n\nAttendee Details:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nCompany: ${formData.company}\nJob Title: ${formData.jobTitle}\n\nPlease confirm my registration.\n\nBest regards,\n${formData.firstName}`
      );
      
      // Clean email addresses (remove quotes, handle multiple emails with commas)
      const toEmails = course.contactEmail.replace(/;/g, ',');
      
      const mailtoLink = `mailto:${toEmails}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      setFormStatus('success');
    }, 1500);
  };

  if (loading || !course) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const isPast = course.parsedDate.getTime() < new Date().setHours(0,0,0,0);
  const hasExternalLink = !!course.registrationLink;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Catalog
        </button>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#161616] px-8 py-10 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-blue-600 rounded">
                {course.focusArea}
              </span>
              {course.containsWatsonX && (
                <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-600 rounded">
                  watsonx
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                <span>Date: {course.startDate || 'TBD'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>Contact: {course.contactEmail.split(';')[0]}...</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Description</h3>
               <p className="text-gray-600">
                 {course.notes || 'Join us for this specialized training session designed for ' + course.audience + '. This event will cover key topics in ' + course.focusArea + ' and help you advance your technical skills.'}
               </p>
               {course.containsWatsonX && (
                 <div className="mt-4 bg-blue-50 p-4 rounded-md border-l-4 border-blue-600">
                   <p className="text-sm text-blue-800 font-medium">
                     This session includes content related to <span className="font-bold">watsonx</span>, IBM's AI and data platform.
                   </p>
                 </div>
               )}
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Registration Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Registration</h3>
              
              {isPast ? (
                <div className="bg-gray-100 p-6 rounded-lg text-center border border-gray-300">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Event Ended</h4>
                  <p className="text-gray-600">
                    This event has already taken place. Registration is closed.
                  </p>
                  <button 
                     onClick={() => navigate('/')}
                     className="mt-6 text-blue-600 underline hover:text-blue-800"
                  >
                    View other events
                  </button>
                </div>
              ) : hasExternalLink ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
                  <p className="text-gray-700 mb-6">
                    Registration for this event is handled through an external IBM Events page.
                  </p>
                  <a 
                    href={course.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0f62fe] hover:bg-blue-700 transition-colors"
                  >
                    Go to Registration Page <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </div>
              ) : (
                <>
                  {formStatus === 'success' ? (
                    <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-green-800 mb-2">Registration Request Initiated</h4>
                      <p className="text-green-700">
                        Since this is a custom event, your default email client has been opened with a pre-filled registration request addressed to the event organizer ({course.contactEmail}).
                      </p>
                      <p className="mt-4 text-sm text-green-600">
                        Please hit "Send" in your email client to complete the process.
                      </p>
                      <button 
                         onClick={() => setFormStatus('idle')}
                         className="mt-6 text-green-700 underline hover:text-green-900"
                      >
                        Register another person
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">
                          This event does not have an automatic registration link. Please fill out the form below. 
                          By clicking "Request Registration", <strong>your email client will open</strong> to send the details directly to the organizer.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="company"
                              id="company"
                              required
                              value={formData.company}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="jobTitle"
                              id="jobTitle"
                              required
                              value={formData.jobTitle}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6 pt-4">
                          <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f62fe] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                          >
                            {formStatus === 'submitting' ? 'Processing...' : 'Request Registration'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};