import {
  Files,
  FileText,
  File,
  FolderArchive,
  Image as ImageIcon,
  Upload,
  FolderOpen
} from 'lucide-react';
import { Link } from 'react-router';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockFiles, formatFileSize, formatDate } from '../data/mockData';

export function Dashboard() {
  const totalFiles = mockFiles.filter(f => !f.isDeleted).length;
  const compressedFiles = mockFiles.filter(f => f.type === 'zip').length;
  const pdfFiles = mockFiles.filter(f => f.type === 'pdf').length;
  const txtFiles = mockFiles.filter(f => f.type === 'txt').length;

  const fileTypeData = [
    { name: 'PDF', value: pdfFiles, color: '#ef4444' },
    { name: 'ZIP', value: compressedFiles, color: '#f59e0b' },
    { name: 'TXT', value: txtFiles, color: '#6b7280' },
    { name: 'DOCX', value: mockFiles.filter(f => f.type === 'docx').length, color: '#3b82f6' },
    { name: 'Imágenes', value: mockFiles.filter(f => f.type === 'image').length, color: '#8b5cf6' },
    { name: 'Otros', value: mockFiles.filter(f => !['pdf', 'docx', 'zip', 'image', 'txt'].includes(f.type)).length, color: '#10b981' },
  ].filter(item => item.value > 0);

  const recentFiles = mockFiles.slice(0, 5);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={20} />;
      case 'docx': return <FileText className="text-blue-500" size={20} />;
      case 'zip': return <FolderArchive className="text-yellow-500" size={20} />;
      case 'image': return <ImageIcon className="text-purple-500" size={20} />;
      default: return <File className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Vista general del almacenamiento</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Files className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalFiles}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Archivos almacenados (total)</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <FolderArchive className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{compressedFiles}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Archivos comprimidos</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <FileText className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pdfFiles}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Archivos PDF</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FileText className="text-gray-600 dark:text-gray-400" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{txtFiles}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Archivos de texto</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/upload"
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-white group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Subir archivos</h3>
              <p className="text-blue-100">Añade nuevos archivos al repositorio</p>
            </div>
          </div>
        </Link>

        <Link
          to="/files"
          className="bg-gradient-to-br from-slate-500 to-slate-600 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-white group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <FolderOpen size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Ver archivos</h3>
              <p className="text-slate-100">Explora y gestiona los archivos</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribución por tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fileTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {fileTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Files Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Archivos recientes</h3>
          <div className="space-y-3 max-h-[268px] overflow-y-auto">
            {recentFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
