
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Send, Users } from 'lucide-react';

const NotificationPage = () => {
  const [autoSendEnabled, setAutoSendEnabled] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState({
    subject: 'New Book Available: {{bookTitle}}',
    body: `Hi {{userName}},

We're excited to announce a new podcast episode is now available!

📚 Book: {{bookTitle}} by {{authorName}}
🎙️ Host: {{hostName}}
🎭 Guest: {{guestName}} ({{guestRole}})
⏱️ Duration: {{duration}}

{{description}}

Start listening now and dive into this amazing story!

Best regards,
The BookCast Team`
  });

  const [testEmail, setTestEmail] = useState('');

  const handleSaveSettings = () => {
    console.log('Saving notification settings:', { autoSendEnabled, emailTemplate });
    alert('Settings saved successfully!');
  };

  const handleSendTestEmail = () => {
    if (!testEmail) {
      alert('Please enter a test email address');
      return;
    }
    console.log('Sending test email to:', testEmail);
    alert(`Test email sent to ${testEmail}`);
    setTestEmail('');
  };

  const previewEmail = emailTemplate.body
    .replace(/{{userName}}/g, 'John Doe')
    .replace(/{{bookTitle}}/g, 'The Seven Husbands of Evelyn Hugo')
    .replace(/{{authorName}}/g, 'Taylor Jenkins Reid')
    .replace(/{{hostName}}/g, 'Sarah Chen')
    .replace(/{{guestName}}/g, 'Evelyn Hugo')
    .replace(/{{guestRole}}/g, 'Main Character')
    .replace(/{{duration}}/g, '45 minutes')
    .replace(/{{description}}/g, 'Join us for an intimate conversation with the legendary Evelyn Hugo herself as she reveals the truth behind her seven marriages.');

  return (
    <div className="space-y-6">
      {/* Auto-send Toggle */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto-send Notifications</h3>
            <p className="text-gray-600">Automatically send email notifications when new books are added</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoSendEnabled}
              onChange={(e) => setAutoSendEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Template Editor */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Template</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                type="text"
                value={emailTemplate.subject}
                onChange={(e) => setEmailTemplate({...emailTemplate, subject: e.target.value})}
                placeholder="Email subject line"
              />
            </div>

            <div>
              <Label htmlFor="body">Email Body</Label>
              <textarea
                id="body"
                value={emailTemplate.body}
                onChange={(e) => setEmailTemplate({...emailTemplate, body: e.target.value})}
                className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm font-mono"
                placeholder="Email body content"
              />
            </div>

            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Available variables:</p>
              <div className="grid grid-cols-2 gap-1">
                <span>{'{{userName}}'}</span>
                <span>{'{{bookTitle}}'}</span>
                <span>{'{{authorName}}'}</span>
                <span>{'{{hostName}}'}</span>
                <span>{'{{guestName}}'}</span>
                <span>{'{{guestRole}}'}</span>
                <span>{'{{duration}}'}</span>
                <span>{'{{description}}'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="border-b border-gray-200 pb-3 mb-3">
              <p className="text-sm text-gray-600">Subject:</p>
              <p className="font-medium">New Book Available: The Seven Husbands of Evelyn Hugo</p>
            </div>
            
            <div className="text-sm whitespace-pre-line leading-relaxed">
              {previewEmail}
            </div>
          </div>
        </div>
      </div>

      {/* Test Email */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Send Test Email</h3>
        <div className="flex gap-4 max-w-md">
          <Input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter test email address"
            className="flex-1"
          />
          <Button onClick={handleSendTestEmail} className="bg-blue-600 hover:bg-blue-700">
            <Send size={16} className="mr-2" />
            Send Test
          </Button>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {[
            { date: '2024-03-15', book: 'The Seven Husbands of Evelyn Hugo', recipients: 1247 },
            { date: '2024-03-10', book: 'Where the Crawdads Sing', recipients: 1198 },
            { date: '2024-03-05', book: 'It Ends with Us', recipients: 1156 }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">{notification.book}</p>
                  <p className="text-sm text-gray-600">{notification.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users size={16} />
                <span className="text-sm">{notification.recipients}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationPage;
