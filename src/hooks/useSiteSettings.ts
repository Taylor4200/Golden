import { useState, useEffect } from 'react';
import { getSiteSettings } from '@/lib/database';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  businessHours: string;
  adminEmail: string;
  notificationsEnabled: boolean;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Golden Heavy Duty Truck Repair',
    siteDescription: 'Professional heavy-duty truck repair services in Hudson, CO',
    contactEmail: 'info@goldenheavyduty.com',
    contactPhone: '(303) 304-9993',
    address: '806 Cedar St, Hudson, CO 80642',
    businessHours: 'Mon-Fri: 9AM-9PM, Sat-Sun: 9AM-5PM, 24/7 Emergency',
    adminEmail: 'admin@goldenheavyduty.com',
    notificationsEnabled: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsData = await getSiteSettings();
        setSettings({
          siteName: settingsData.site_name || 'Golden Heavy Duty Truck Repair',
          siteDescription: settingsData.site_description || 'Professional heavy-duty truck repair services in Hudson, CO',
          contactEmail: settingsData.contact_email || 'info@goldenheavyduty.com',
          contactPhone: settingsData.contact_phone || '(303) 304-9993',
          address: settingsData.address || '806 Cedar St, Hudson, CO 80642',
          businessHours: settingsData.business_hours || 'Mon-Fri: 9AM-9PM, Sat-Sun: 9AM-5PM, 24/7 Emergency',
          adminEmail: settingsData.admin_email || 'admin@goldenheavyduty.com',
          notificationsEnabled: settingsData.notifications_enabled === 'true'
        });
      } catch (err) {
        console.error('Error loading site settings:', err);
        setError('Failed to load site settings');
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  return { settings, isLoading, error, setSettings };
}
