import { Clock, FileText, File, FolderArchive, Image as ImageIcon } from 'lucide-react';
import { mockFiles, formatFileSize, formatDate } from '../data/mockData';

export function RecentUploads() {
  const recentFiles = [...mockFiles]
    .filter(f => !f.isDeleted)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 15);

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
        <div className="flex items-center gap-3 mb-2">
          <Clock className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">Subidas Recientes</h2>
        </div>
        <p className="text-gray-600">Archivos subidos recientemente ordenados por fecha</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {recentFiles.map((file) => (
            <div key={file.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {file.type === 'folder' ? 'Carpeta' : formatFileSize(file.size)}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{formatDate(file.uploadDate)}</span>
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {file.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
