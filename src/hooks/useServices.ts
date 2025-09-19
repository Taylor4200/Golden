import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '@/types/services';
import { getServices, getFeaturedServices, getServiceCategories } from '@/lib/database';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, isLoading, error };
}

export function useFeaturedServices() {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        const servicesData = await getFeaturedServices();
        setFeaturedServices(servicesData);
      } catch (err) {
        console.error('Error loading featured services:', err);
        setError('Failed to load featured services');
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedServices();
  }, []);

  return { featuredServices, isLoading, error };
}

export function useServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getServiceCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading service categories:', err);
        setError('Failed to load service categories');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, isLoading, error };
}

