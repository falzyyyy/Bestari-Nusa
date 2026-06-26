import { createClient } from "@supabase/supabase-js";
import { MockDb, Category, Division, TeamMember, ImpactMetric, Program, Post, Partner, Inquiry } from "./store";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if credentials exist for real Supabase connection
export const isSupabaseConfigured = supabaseUrl !== "" && supabaseAnonKey !== "";

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ----------------------------------------------------
// Unified Database Access Functions
// ----------------------------------------------------

export const db = {
  // Categories
  getCategories: async (type?: 'news' | 'program' | 'research' | 'gallery'): Promise<Category[]> => {
    if (supabase) {
      let query = supabase.from("content_categories").select("*").eq("is_active", true);
      if (type) query = query.eq("type", type);
      const { data, error } = await query.order("order_index", { ascending: true });
      if (error) console.error("Error fetching categories:", error);
      return data || [];
    } else {
      const cats = MockDb.getCategories();
      return type ? cats.filter(c => c.type === type) : cats;
    }
  },

  // Divisions
  getDivisions: async (): Promise<Division[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("divisions").select("*").eq("is_active", true).order("order_index", { ascending: true });
      if (error) console.error("Error fetching divisions:", error);
      return data || [];
    } else {
      return MockDb.getDivisions();
    }
  },

  // Team Members
  getTeamMembers: async (featuredOnly = false): Promise<TeamMember[]> => {
    if (supabase) {
      let query = supabase.from("team_members").select("*").eq("is_active", true);
      if (featuredOnly) query = query.eq("is_featured", true);
      const { data, error } = await query.order("order_index", { ascending: true });
      if (error) console.error("Error fetching team members:", error);
      return data || [];
    } else {
      const members = MockDb.getTeamMembers().filter(m => m.is_active).sort((a, b) => a.order_index - b.order_index);
      return featuredOnly ? members.filter(m => m.is_featured) : members;
    }
  },

  getAllTeamMembersRaw: async (): Promise<TeamMember[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("team_members").select("*").order("order_index", { ascending: true });
      return data || [];
    } else {
      return MockDb.getTeamMembers().sort((a, b) => a.order_index - b.order_index);
    }
  },

  saveTeamMember: async (member: Partial<TeamMember>): Promise<TeamMember> => {
    if (supabase) {
      const { data, error } = await supabase.from("team_members").upsert(member).select().single();
      if (error) throw error;
      return data;
    } else {
      const members = MockDb.getTeamMembers();
      if (member.id) {
        const index = members.findIndex(m => m.id === member.id);
        const updated = { ...members[index], ...member } as TeamMember;
        members[index] = updated;
        MockDb.saveTeamMembers(members);
        return updated;
      } else {
        const newMember = {
          ...member,
          id: `team-${Date.now()}`,
          is_active: member.is_active ?? true,
          is_featured: member.is_featured ?? false,
          order_index: member.order_index ?? (members.length + 1)
        } as TeamMember;
        members.push(newMember);
        MockDb.saveTeamMembers(members);
        return newMember;
      }
    }
  },

  deleteTeamMember: async (id: string): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      return !error;
    } else {
      const members = MockDb.getTeamMembers().filter(m => m.id !== id);
      MockDb.saveTeamMembers(members);
      return true;
    }
  },

  // Impact Metrics
  getImpactMetrics: async (): Promise<ImpactMetric[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("impact_metrics").select("*").eq("is_active", true).order("order_index", { ascending: true });
      if (error) console.error("Error fetching impact metrics:", error);
      return data || [];
    } else {
      return MockDb.getImpactMetrics().filter(m => m.is_active);
    }
  },

  getAllImpactMetricsRaw: async (): Promise<ImpactMetric[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("impact_metrics").select("*").order("order_index", { ascending: true });
      return data || [];
    } else {
      return MockDb.getImpactMetrics();
    }
  },

  saveImpactMetric: async (metric: Partial<ImpactMetric>): Promise<ImpactMetric> => {
    if (supabase) {
      const { data, error } = await supabase.from("impact_metrics").upsert(metric).select().single();
      if (error) throw error;
      return data;
    } else {
      const metrics = MockDb.getImpactMetrics();
      const index = metrics.findIndex(m => m.id === metric.id);
      if (index !== -1) {
        metrics[index] = { ...metrics[index], ...metric } as ImpactMetric;
      } else {
        metrics.push({
          ...metric,
          id: metric.id || `imp-${Date.now()}`,
          is_active: metric.is_active ?? true,
          order_index: metric.order_index ?? (metrics.length + 1)
        } as ImpactMetric);
      }
      MockDb.saveImpactMetrics(metrics);
      return metrics.find(m => m.id === metric.id || m.label === metric.label) as ImpactMetric;
    }
  },

  // Programs
  getPrograms: async (featuredOnly = false, categorySlug?: string): Promise<Program[]> => {
    if (supabase) {
      let query = supabase.from("programs").select("*, content_categories!inner(slug)").neq("status", "archived");
      if (featuredOnly) query = query.eq("is_featured", true);
      if (categorySlug) query = query.eq("content_categories.slug", categorySlug);
      const { data, error } = await query.order("order_index", { ascending: true });
      if (error) console.error("Error fetching programs:", error);
      return data || [];
    } else {
      let progs = MockDb.getPrograms().filter(p => p.status !== 'archived');
      if (featuredOnly) progs = progs.filter(p => p.is_featured);
      if (categorySlug) {
        const cats = MockDb.getCategories();
        const cat = cats.find(c => c.slug === categorySlug);
        if (cat) progs = progs.filter(p => p.category_id === cat.id);
      }
      return progs.sort((a, b) => a.order_index - b.order_index);
    }
  },

  getAllProgramsRaw: async (): Promise<Program[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("programs").select("*").order("order_index", { ascending: true });
      return data || [];
    } else {
      return MockDb.getPrograms().sort((a, b) => a.order_index - b.order_index);
    }
  },

  getProgramBySlug: async (slug: string): Promise<Program | null> => {
    if (supabase) {
      const { data, error } = await supabase.from("programs").select("*").eq("slug", slug).maybeSingle();
      if (error) console.error("Error fetching program details:", error);
      return data;
    } else {
      const progs = MockDb.getPrograms();
      return progs.find(p => p.slug === slug) || null;
    }
  },

  saveProgram: async (program: Partial<Program>): Promise<Program> => {
    if (supabase) {
      const { data, error } = await supabase.from("programs").upsert(program).select().single();
      if (error) throw error;
      return data;
    } else {
      const progs = MockDb.getPrograms();
      if (program.id) {
        const index = progs.findIndex(p => p.id === program.id);
        const updated = { ...progs[index], ...program } as Program;
        progs[index] = updated;
        MockDb.savePrograms(progs);
        return updated;
      } else {
        const newProg = {
          ...program,
          id: `prog-${Date.now()}`,
          status: program.status ?? 'upcoming',
          gallery: program.gallery ?? [],
          objectives: program.objectives ?? [],
          impact_metrics: program.impact_metrics ?? [],
          is_featured: program.is_featured ?? false,
          order_index: program.order_index ?? (progs.length + 1)
        } as Program;
        progs.push(newProg);
        MockDb.savePrograms(progs);
        return newProg;
      }
    }
  },

  deleteProgram: async (id: string): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("programs").delete().eq("id", id);
      return !error;
    } else {
      const progs = MockDb.getPrograms().filter(p => p.id !== id);
      MockDb.savePrograms(progs);
      return true;
    }
  },

  // News/Posts
  getPosts: async (featuredOnly = false, categorySlug?: string): Promise<Post[]> => {
    if (supabase) {
      let query = supabase.from("posts").select("*, content_categories!inner(slug)").eq("status", "published");
      if (featuredOnly) query = query.eq("is_featured", true);
      if (categorySlug) query = query.eq("content_categories.slug", categorySlug);
      const { data, error } = await query.order("published_at", { ascending: false });
      if (error) console.error("Error fetching posts:", error);
      return data || [];
    } else {
      let posts = MockDb.getPosts().filter(p => p.status === 'published');
      if (featuredOnly) posts = posts.filter(p => p.is_featured);
      if (categorySlug) {
        const cats = MockDb.getCategories();
        const cat = cats.find(c => c.slug === categorySlug);
        if (cat) posts = posts.filter(p => p.category_id === cat.id);
      }
      return posts.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());
    }
  },

  getAllPostsRaw: async (): Promise<Post[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      return data || [];
    } else {
      return MockDb.getPosts();
    }
  },

  getPostBySlug: async (slug: string): Promise<Post | null> => {
    if (supabase) {
      const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
      if (error) console.error("Error fetching post details:", error);
      return data;
    } else {
      const posts = MockDb.getPosts();
      return posts.find(p => p.slug === slug) || null;
    }
  },

  savePost: async (post: Partial<Post>): Promise<Post> => {
    if (supabase) {
      const { data, error } = await supabase.from("posts").upsert(post).select().single();
      if (error) throw error;
      return data;
    } else {
      const posts = MockDb.getPosts();
      if (post.id) {
        const index = posts.findIndex(p => p.id === post.id);
        const updated = { ...posts[index], ...post } as Post;
        posts[index] = updated;
        MockDb.savePosts(posts);
        return updated;
      } else {
        const newPost = {
          ...post,
          id: `post-${Date.now()}`,
          status: post.status ?? 'draft',
          is_featured: post.is_featured ?? false,
          published_at: post.status === 'published' ? new Date().toISOString() : undefined,
          reading_time: post.reading_time ?? Math.ceil((post.content || '').split(' ').length / 200)
        } as Post;
        posts.push(newPost);
        MockDb.savePosts(posts);
        return newPost;
      }
    }
  },

  deletePost: async (id: string): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      return !error;
    } else {
      const posts = MockDb.getPosts().filter(p => p.id !== id);
      MockDb.savePosts(posts);
      return true;
    }
  },

  // Partners
  getPartners: async (featuredOnly = false): Promise<Partner[]> => {
    if (supabase) {
      let query = supabase.from("partners").select("*").eq("is_active", true);
      if (featuredOnly) query = query.eq("is_featured", true);
      const { data, error } = await query.order("order_index", { ascending: true });
      if (error) console.error("Error fetching partners:", error);
      return data || [];
    } else {
      const partners = MockDb.getPartners().filter(p => p.is_active);
      return featuredOnly ? partners.filter(p => p.is_featured) : partners;
    }
  },

  getAllPartnersRaw: async (): Promise<Partner[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("partners").select("*").order("order_index", { ascending: true });
      return data || [];
    } else {
      return MockDb.getPartners();
    }
  },

  savePartner: async (partner: Partial<Partner>): Promise<Partner> => {
    if (supabase) {
      const { data, error } = await supabase.from("partners").upsert(partner).select().single();
      if (error) throw error;
      return data;
    } else {
      const partners = MockDb.getPartners();
      if (partner.id) {
        const index = partners.findIndex(p => p.id === partner.id);
        const updated = { ...partners[index], ...partner } as Partner;
        partners[index] = updated;
        MockDb.savePartners(partners);
        return updated;
      } else {
        const newPartner = {
          ...partner,
          id: `part-${Date.now()}`,
          is_active: partner.is_active ?? true,
          is_featured: partner.is_featured ?? false,
          order_index: partner.order_index ?? (partners.length + 1)
        } as Partner;
        partners.push(newPartner);
        MockDb.savePartners(partners);
        return newPartner;
      }
    }
  },

  deletePartner: async (id: string): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("partners").delete().eq("id", id);
      return !error;
    } else {
      const partners = MockDb.getPartners().filter(p => p.id !== id);
      MockDb.savePartners(partners);
      return true;
    }
  },

  // Inquiries
  getInquiries: async (): Promise<Inquiry[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) console.error("Error fetching inquiries:", error);
      return data || [];
    } else {
      return MockDb.getInquiries().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  submitInquiry: async (inquiry: Omit<Inquiry, "id" | "status" | "internal_notes" | "created_at">): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("inquiries").insert({
        ...inquiry,
        status: "new"
      });
      return !error;
    } else {
      const inqs = MockDb.getInquiries();
      const newInq: Inquiry = {
        ...inquiry,
        id: `inq-${Date.now()}`,
        status: 'new',
        internal_notes: '',
        created_at: new Date().toISOString()
      };
      inqs.push(newInq);
      MockDb.saveInquiries(inqs);
      return true;
    }
  },

  updateInquiryStatus: async (id: string, status: Inquiry['status'], notes?: string): Promise<boolean> => {
    if (supabase) {
      const updateData: any = { status };
      if (notes !== undefined) updateData.internal_notes = notes;
      const { error } = await supabase.from("inquiries").update(updateData).eq("id", id);
      return !error;
    } else {
      const inqs = MockDb.getInquiries();
      const index = inqs.findIndex(i => i.id === id);
      if (index !== -1) {
        inqs[index].status = status;
        if (notes !== undefined) inqs[index].internal_notes = notes;
        MockDb.saveInquiries(inqs);
        return true;
      }
      return false;
    }
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    if (supabase) {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      return !error;
    } else {
      const inqs = MockDb.getInquiries().filter(i => i.id !== id);
      MockDb.saveInquiries(inqs);
      return true;
    }
  }
};
