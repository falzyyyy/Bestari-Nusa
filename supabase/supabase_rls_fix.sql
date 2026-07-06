-- Fix RLS Policies for Bestari Nusa Website CMS Admin features
-- Run this in your Supabase SQL Editor (https://supabase.com)

-- 1. Site Settings Policies
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;

CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 2. Pages Policies
DROP POLICY IF EXISTS "Public can read published pages" ON public.pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;

CREATE POLICY "Public can read published pages"
  ON public.pages FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage pages"
  ON public.pages FOR ALL TO authenticated USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());

-- 3. Media Assets Policies
DROP POLICY IF EXISTS "Public can read media assets" ON public.media_assets;
DROP POLICY IF EXISTS "Admins can manage media assets" ON public.media_assets;

CREATE POLICY "Public can read media assets"
  ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admins can manage media assets"
  ON public.media_assets FOR ALL TO authenticated USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());

-- 4. Post Tags Policies
DROP POLICY IF EXISTS "Public can read post tags" ON public.post_tags;
DROP POLICY IF EXISTS "Admins can manage post tags" ON public.post_tags;

CREATE POLICY "Public can read post tags"
  ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "Admins can manage post tags"
  ON public.post_tags FOR ALL TO authenticated USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());

-- 5. Program Gallery Policies
DROP POLICY IF EXISTS "Public can read program gallery" ON public.program_gallery;
DROP POLICY IF EXISTS "Admins can manage program gallery" ON public.program_gallery;

CREATE POLICY "Public can read program gallery"
  ON public.program_gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage program gallery"
  ON public.program_gallery FOR ALL TO authenticated USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());

-- 6. Audit Logs Policies
DROP POLICY IF EXISTS "Admins can manage audit logs" ON public.audit_logs;

CREATE POLICY "Admins can manage audit logs"
  ON public.audit_logs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
