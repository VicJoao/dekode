import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type CodeSnippet = Database['public']['Tables']['code_snippets']['Row'];
type CodeSnippetInsert = Database['public']['Tables']['code_snippets']['Insert'];
type CodeSnippetUpdate = Database['public']['Tables']['code_snippets']['Update'];

export const useCodeSnippets = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSnippets = async () => {
    if (!user) {
      setSnippets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('code_snippets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSnippets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSnippet = async (snippet: Omit<CodeSnippetInsert, 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('code_snippets')
        .insert([{ ...snippet, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setSnippets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateSnippet = async (id: string, updates: CodeSnippetUpdate) => {
    try {
      const { data, error } = await supabase
        .from('code_snippets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setSnippets(prev => prev.map(s => s.id === id ? data : s));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      const { error } = await supabase
        .from('code_snippets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSnippets(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [user]);

  return {
    snippets,
    loading,
    error,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    refetch: fetchSnippets,
  };
};