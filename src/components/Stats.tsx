import { useEffect, useState } from 'react';
import { TrendingUp, FileText, Image } from 'lucide-react';
import { supabase, Conversion } from '../lib/supabase';

export function Stats() {
  const [stats, setStats] = useState({
    totalConversions: 0,
    totalSlides: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data } = await supabase
      .from('conversions')
      .select('total_slides')
      .order('created_at', { ascending: false })
      .limit(100);

    if (data) {
      const total = data.reduce((sum, conv) => sum + conv.total_slides, 0);
      setStats({
        totalConversions: data.length,
        totalSlides: total,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="w-8 h-8 opacity-80" />
        </div>
        <div>
          <p className="text-blue-100 text-sm font-medium mb-1">Total Conversions</p>
          <p className="text-4xl font-bold">{stats.totalConversions}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <FileText className="w-8 h-8 opacity-80" />
        </div>
        <div>
          <p className="text-green-100 text-sm font-medium mb-1">Files Processed</p>
          <p className="text-4xl font-bold">{stats.totalConversions}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Image className="w-8 h-8 opacity-80" />
        </div>
        <div>
          <p className="text-purple-100 text-sm font-medium mb-1">Slides Converted</p>
          <p className="text-4xl font-bold">{stats.totalSlides}</p>
        </div>
      </div>
    </div>
  );
}
