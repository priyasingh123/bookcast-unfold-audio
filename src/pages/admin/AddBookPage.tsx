
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    bookType: 'fiction',
    genre: '',
    hostGender: 'female',
    guestName: '',
    guestRole: '',
    description: '',
    coverImageUrl: '',
    audioFileUrl: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new book:', formData);
    // In real app, submit to API
    alert('Book added successfully!');
    // Reset form
    setFormData({
      title: '',
      author: '',
      bookType: 'fiction',
      genre: '',
      hostGender: 'female',
      guestName: '',
      guestRole: '',
      description: '',
      coverImageUrl: '',
      audioFileUrl: '',
      duration: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                placeholder="Enter book title"
              />
            </div>

            <div>
              <Label htmlFor="author">Author Name *</Label>
              <Input
                id="author"
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                required
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bookType">Book Type *</Label>
              <select
                id="bookType"
                value={formData.bookType}
                onChange={(e) => handleInputChange('bookType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
              </select>
            </div>

            <div>
              <Label htmlFor="genre">Genre *</Label>
              <select
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select genre</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="mystery">Mystery</option>
                <option value="fiction">Fiction</option>
                <option value="biography">Biography</option>
                <option value="business">Business</option>
                <option value="self-help">Self Help</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="hostGender">Host Gender *</Label>
              <select
                id="hostGender"
                value={formData.hostGender}
                onChange={(e) => handleInputChange('hostGender', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                required
                placeholder="e.g., 45"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="guestName">Guest Name *</Label>
              <Input
                id="guestName"
                type="text"
                value={formData.guestName}
                onChange={(e) => handleInputChange('guestName', e.target.value)}
                required
                placeholder="Character name or author"
              />
            </div>

            <div>
              <Label htmlFor="guestRole">Guest Role *</Label>
              <Input
                id="guestRole"
                type="text"
                value={formData.guestRole}
                onChange={(e) => handleInputChange('guestRole', e.target.value)}
                required
                placeholder="Main Character or Author"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              placeholder="Enter episode description"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="coverImageUrl">Cover Image URL *</Label>
            <Input
              id="coverImageUrl"
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
              required
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div>
            <Label htmlFor="audioFileUrl">Audio File URL *</Label>
            <Input
              id="audioFileUrl"
              type="url"
              value={formData.audioFileUrl}
              onChange={(e) => handleInputChange('audioFileUrl', e.target.value)}
              required
              placeholder="https://example.com/podcast-episode.mp3"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 flex-1"
            >
              Add Book
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({
                title: '',
                author: '',
                bookType: 'fiction',
                genre: '',
                hostGender: 'female',
                guestName: '',
                guestRole: '',
                description: '',
                coverImageUrl: '',
                audioFileUrl: '',
                duration: ''
              })}
              className="flex-1"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
