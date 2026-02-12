import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Filter, Search } from 'lucide-react';
import { COURSES } from '../utils/csvParser';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');

  // Extract unique filter options
  const focusAreas = useMemo(() => {
    const areas = new Set(COURSES.map(c => c.focusArea).filter(Boolean));
    return ['All', ...Array.from(areas)].sort();
  }, []);

  const months = useMemo(() => {
    const allDates = new Set(COURSES.map(c => c.startDate).filter(Boolean));
    return ['All', ...Array.from(allDates)].sort();
  }, []);

  const filteredCourses = useMemo(() => {
    const filtered = COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            course.focusArea.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFocus = selectedFocus === 'All' || course.focusArea === selectedFocus;
      const matchesMonth = selectedMonth === 'All' || course.startDate === selectedMonth;

      return matchesSearch && matchesFocus && matchesMonth;
    });

    // Sort by Date Ascending (Chronological: Jan -> Dec)
    return filtered.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  }, [searchTerm, selectedFocus, selectedMonth]);

  const isPast = (date: Date) => {
    const now = new Date();
    // Compare ensuring we don't disable today's events, only strictly past
    return date.getTime() < now.setHours(0,0,0,0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-[#0f62fe] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Elevate Your Skills</h1>
          <p className="text-xl max-w-2xl text-blue-100">
            Discover and register for the upcoming 2026 technical training sessions, workshops, and enablement events from the IBM SPGI Technical Team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Focus Area Filter */}
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
              >
                {focusAreas.map(area => (
                  <option key={area} value={area}>{area === 'All' ? 'All Focus Areas' : area}</option>
                ))}
              </select>
            </div>

            {/* Date Filter (Simplified) */}
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                 <option value="All">All Dates</option>
                {months.filter(m => m !== 'All').map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const courseEnded = isPast(course.parsedDate);
            
            return (
              <div key={course.id} className={`bg-white flex flex-col rounded-lg shadow-sm border border-gray-200 transition-shadow duration-300 ${courseEnded ? 'opacity-75' : 'hover:shadow-lg'}`}>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.focusArea === 'Automation' ? 'bg-purple-100 text-purple-800' :
                      course.focusArea === 'Data and AI' ? 'bg-blue-100 text-blue-800' :
                      course.focusArea === 'Z' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.focusArea}
                    </span>
                    {course.containsWatsonX && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        watsonx
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>
                  
                  <div className="space-y-2 mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{course.startDate || 'TBD'}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{course.audience}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 rounded-b-lg">
                  {courseEnded ? (
                    <button 
                      disabled
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed"
                    >
                      Terminado
                    </button>
                  ) : (
                    <Link 
                      to={`/register/${course.id}`}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f62fe] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View & Register <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedFocus('All'); setSelectedMonth('All');}}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};