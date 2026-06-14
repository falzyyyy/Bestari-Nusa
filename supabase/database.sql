-- Bestari Nusa Company Profile Database Schema
-- Version: 1.0

-- Create custom enum types
create type user_role as enum (
  'super_admin',
  'admin',
  'editor',
  'contributor',
  'viewer'
);

create type content_status as enum (
  'draft',
  'in_review',
  'scheduled',
  'published',
  'archived'
);

create type program_status as enum (
  'upcoming',
  'ongoing',
  'completed',
  'archived'
);

create type inquiry_status as enum (
  'new',
  'read',
  'in_progress',
  'replied',
  'closed',
  'spam'
);

create type inquiry_type as enum (
  'collaboration',
  'csr',
  'media',
  'volunteer',
  'research',
  'general'
);

-- Profiles table (linked to auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role user_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Content Categories table
create table public.content_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  type text not null check (type in ('news', 'program', 'research', 'gallery')),
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tags table
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- Media Assets table
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  storage_path text not null,
  mime_type text not null,
  size_bytes bigint,
  alt_text text,
  caption text,
  folder text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Posts/News table
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  category_id uuid references public.content_categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  status content_status not null default 'draft',
  is_featured boolean default false,
  published_at timestamptz,
  scheduled_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id) on delete set null,
  reading_time int,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Post Tags relation table (many-to-many)
create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Programs table
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  category_id uuid references public.content_categories(id) on delete set null,
  status program_status not null default 'upcoming',
  location text,
  start_date date,
  end_date date,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  objectives jsonb default '[]'::jsonb,
  target_beneficiaries text,
  approach text,
  impact_summary text,
  impact_metrics jsonb default '[]'::jsonb,
  registration_url text,
  collaboration_cta text,
  is_featured boolean default false,
  order_index int default 0,
  seo_title text,
  seo_description text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Program Gallery table (many-to-many / repeater)
create table public.program_gallery (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references public.programs(id) on delete cascade,
  media_id uuid references public.media_assets(id) on delete cascade,
  order_index int default 0,
  created_at timestamptz default now()
);

-- Divisions table
create table public.divisions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  parent_division_id uuid references public.divisions(id) on delete set null,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz not null default now()
);

-- Team Members table
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  position text not null,
  division_id uuid references public.divisions(id) on delete set null,
  photo_id uuid references public.media_assets(id) on delete set null,
  bio text,
  email text,
  social_links jsonb default '{}'::jsonb,
  order_index int default 0,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Partners table
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  logo_id uuid references public.media_assets(id) on delete set null,
  website_url text,
  description text,
  partnership_type text,
  year int,
  is_featured boolean default false,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials table
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  institution text,
  quote text not null,
  photo_id uuid references public.media_assets(id) on delete set null,
  related_program_id uuid references public.programs(id) on delete set null,
  is_featured boolean default false,
  status content_status default 'draft',
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Impact Metrics table
create table public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value numeric not null default 0,
  suffix text,
  description text,
  icon text,
  category text,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Publications table
create table public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  abstract text,
  content text,
  file_id uuid references public.media_assets(id) on delete set null,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  category_id uuid references public.content_categories(id) on delete set null,
  authors jsonb default '[]'::jsonb,
  year int,
  status content_status default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Inquiries table (Contact form submissions)
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  institution text,
  inquiry_type inquiry_type not null default 'general',
  message text not null,
  status inquiry_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pages table
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  status content_status default 'draft',
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Site Settings table
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz default now()
);

-- Audit Logs table
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

-- ----------------------------------------------------
-- Triggers for updated_at
-- ----------------------------------------------------

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger set_programs_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

create trigger set_divisions_updated_at
before update on public.divisions
for each row execute function public.set_updated_at();

create trigger set_team_members_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

create trigger set_partners_updated_at
before update on public.partners
for each row execute function public.set_updated_at();

create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

create trigger set_impact_metrics_updated_at
before update on public.impact_metrics
for each row execute function public.set_updated_at();

create trigger set_publications_updated_at
before update on public.publications
for each row execute function public.set_updated_at();

create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

-- ----------------------------------------------------
-- Helper Functions for Row Level Security
-- ----------------------------------------------------

create or replace function public.current_user_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer;

create or replace function public.is_admin()
returns boolean as $$
  select public.current_user_role() in ('super_admin', 'admin');
$$ language sql security definer;

create or replace function public.can_edit_content()
returns boolean as $$
  select public.current_user_role() in ('super_admin', 'admin', 'editor');
$$ language sql security definer;

-- ----------------------------------------------------
-- Auto-create profile on auth signup trigger
-- ----------------------------------------------------

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role, is_active)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Admin Bestari'),
    new.raw_user_meta_data->>'avatar_url',
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'admin'::public.user_role),
    true
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------
-- Enable Row Level Security (RLS)
-- ----------------------------------------------------

alter table public.profiles enable row level security;
alter table public.content_categories enable row level security;
alter table public.tags enable row level security;
alter table public.media_assets enable row level security;
alter table public.posts enable row level security;
alter table public.post_tags enable row level security;
alter table public.programs enable row level security;
alter table public.program_gallery enable row level security;
alter table public.divisions enable row level security;
alter table public.team_members enable row level security;
alter table public.partners enable row level security;
alter table public.testimonials enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.publications enable row level security;
alter table public.inquiries enable row level security;
alter table public.pages enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_logs enable row level security;

-- ----------------------------------------------------
-- RLS Policies
-- ----------------------------------------------------

-- Profiles Policies
create policy "Public can read active profiles"
  on public.profiles for select using (is_active = true);
create policy "Admins can manage profiles"
  on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Categories & Tags Policies
create policy "Public can read categories"
  on public.content_categories for select using (is_active = true);
create policy "Admins can manage categories"
  on public.content_categories for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "Public can read tags"
  on public.tags for select using (true);
create policy "Admins can manage tags"
  on public.tags for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Posts/News Policies
create policy "Public can read published posts"
  on public.posts for select using (status = 'published');
create policy "Admins can manage posts"
  on public.posts for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Programs Policies
create policy "Public can read active programs"
  on public.programs for select using (status in ('upcoming', 'ongoing', 'completed'));
create policy "Admins can manage programs"
  on public.programs for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Team & Divisions Policies
create policy "Public can read divisions"
  on public.divisions for select using (is_active = true);
create policy "Admins can manage divisions"
  on public.divisions for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "Public can read team members"
  on public.team_members for select using (is_active = true);
create policy "Admins can manage team members"
  on public.team_members for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Partners Policies
create policy "Public can read partners"
  on public.partners for select using (is_active = true);
create policy "Admins can manage partners"
  on public.partners for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Testimonials & Impact Policies
create policy "Public can read testimonials"
  on public.testimonials for select using (status = 'published');
create policy "Admins can manage testimonials"
  on public.testimonials for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "Public can read impact metrics"
  on public.impact_metrics for select using (is_active = true);
create policy "Admins can manage impact metrics"
  on public.impact_metrics for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Publications Policies
create policy "Public can read published publications"
  on public.publications for select using (status = 'published');
create policy "Admins can manage publications"
  on public.publications for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

-- Inquiry Policies
create policy "Public can create inquiry"
  on public.inquiries for insert with check (true);
create policy "Admins can read inquiries"
  on public.inquiries for select to authenticated using (public.current_user_role() in ('super_admin', 'admin', 'viewer'));
create policy "Admins can update inquiries"
  on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------
-- Indexes
-- ----------------------------------------------------

create index posts_status_idx on public.posts(status);
create index posts_slug_idx on public.posts(slug);
create index posts_published_at_idx on public.posts(published_at desc);
create index programs_slug_idx on public.programs(slug);
create index programs_status_idx on public.programs(status);
create index team_members_division_idx on public.team_members(division_id);
create index inquiries_status_idx on public.inquiries(status);
create index media_assets_folder_idx on public.media_assets(folder);

-- ----------------------------------------------------
-- Seed Data
-- ----------------------------------------------------

-- Categories
insert into public.content_categories (name, slug, type, description)
values
('Berita Kegiatan', 'berita-kegiatan', 'news', 'Update kegiatan resmi Bestari Nusa'),
('Cerita Dampak', 'cerita-dampak', 'news', 'Cerita perubahan dan pembelajaran dari program'),
('Riset Sosial', 'riset-sosial', 'news', 'Artikel dan insight berbasis riset sosial'),
('Youth Development', 'youth-development', 'program', 'Program pengembangan kapasitas pemuda'),
('Community Development', 'community-development', 'program', 'Program pemberdayaan komunitas'),
('Sustainability', 'sustainability', 'program', 'Program keberlanjutan lingkungan dan sosial'),
('CSR Collaboration', 'csr-collaboration', 'program', 'Program kolaborasi CSR dan institusi');

-- Impact Metrics
insert into public.impact_metrics (label, value, suffix, description, icon, order_index)
values
('Program Terlaksana', 10, '+', 'Inisiatif sosial dan pengembangan komunitas', 'leaf', 1),
('Pemuda Terlibat', 250, '+', 'Generasi muda dalam pelatihan dan aksi sosial', 'users', 2),
('Mitra Kolaborasi', 15, '+', 'Institusi, komunitas, dan partner program', 'handshake', 3),
('Wilayah Dampingan', 5, '+', 'Area komunitas yang menjadi ruang aksi', 'map', 4);
