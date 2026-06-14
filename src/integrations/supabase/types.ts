export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      editorial_notes: {
        Row: {
          created_at: string
          id: string
          locale: Database["public"]["Enums"]["supported_locale"]
          source_ids: string[]
          summary: string
          topic: string
        }
        Insert: {
          created_at?: string
          id?: string
          locale?: Database["public"]["Enums"]["supported_locale"]
          source_ids?: string[]
          summary: string
          topic: string
        }
        Update: {
          created_at?: string
          id?: string
          locale?: Database["public"]["Enums"]["supported_locale"]
          source_ids?: string[]
          summary?: string
          topic?: string
        }
        Relationships: []
      }
      goal_sources: {
        Row: {
          goal_id: string
          id: string
          source_id: string
        }
        Insert: {
          goal_id: string
          id?: string
          source_id: string
        }
        Update: {
          goal_id?: string
          id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_sources_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "health_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goal_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      health_goal_translations: {
        Row: {
          description: string
          goal_id: string
          id: string
          locale: Database["public"]["Enums"]["supported_locale"]
          name: string
        }
        Insert: {
          description?: string
          goal_id: string
          id?: string
          locale: Database["public"]["Enums"]["supported_locale"]
          name: string
        }
        Update: {
          description?: string
          goal_id?: string
          id?: string
          locale?: Database["public"]["Enums"]["supported_locale"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_goal_translations_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "health_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      health_goals: {
        Row: {
          created_at: string
          icon: string
          id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          sort_order?: number
        }
        Relationships: []
      }
      ingredient_goal_rules: {
        Row: {
          goal_id: string
          id: string
          ingredient_id: string
          rationale: string
          score: number
        }
        Insert: {
          goal_id: string
          id?: string
          ingredient_id: string
          rationale?: string
          score?: number
        }
        Update: {
          goal_id?: string
          id?: string
          ingredient_id?: string
          rationale?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_goal_rules_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "health_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_goal_rules_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_pairings: {
        Row: {
          compatibility_score: number
          id: string
          ingredient_a_id: string
          ingredient_b_id: string
          pairing_type: Database["public"]["Enums"]["pairing_type"]
        }
        Insert: {
          compatibility_score?: number
          id?: string
          ingredient_a_id: string
          ingredient_b_id: string
          pairing_type?: Database["public"]["Enums"]["pairing_type"]
        }
        Update: {
          compatibility_score?: number
          id?: string
          ingredient_a_id?: string
          ingredient_b_id?: string
          pairing_type?: Database["public"]["Enums"]["pairing_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_pairings_ingredient_a_id_fkey"
            columns: ["ingredient_a_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_pairings_ingredient_b_id_fkey"
            columns: ["ingredient_b_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_translations: {
        Row: {
          id: string
          ingredient_id: string
          locale: Database["public"]["Enums"]["supported_locale"]
          name: string
        }
        Insert: {
          id?: string
          ingredient_id: string
          locale: Database["public"]["Enums"]["supported_locale"]
          name: string
        }
        Update: {
          id?: string
          ingredient_id?: string
          locale?: Database["public"]["Enums"]["supported_locale"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_translations_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          category: string
          created_at: string
          emoji: string
          id: string
          sort_order: number
        }
        Insert: {
          category: string
          created_at?: string
          emoji?: string
          id?: string
          sort_order?: number
        }
        Update: {
          category?: string
          created_at?: string
          emoji?: string
          id?: string
          sort_order?: number
        }
        Relationships: []
      }
      language_settings: {
        Row: {
          enabled: boolean
          id: string
          label: string
          locale: Database["public"]["Enums"]["supported_locale"]
        }
        Insert: {
          enabled?: boolean
          id?: string
          label: string
          locale: Database["public"]["Enums"]["supported_locale"]
        }
        Update: {
          enabled?: boolean
          id?: string
          label?: string
          locale?: Database["public"]["Enums"]["supported_locale"]
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          amount: string
          id: string
          importance_score: number
          ingredient_id: string
          is_required: boolean
          recipe_id: string
          unit: string
        }
        Insert: {
          amount?: string
          id?: string
          importance_score?: number
          ingredient_id: string
          is_required?: boolean
          recipe_id: string
          unit?: string
        }
        Update: {
          amount?: string
          id?: string
          importance_score?: number
          ingredient_id?: string
          is_required?: boolean
          recipe_id?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_sources: {
        Row: {
          id: string
          recipe_id: string
          source_id: string
        }
        Insert: {
          id?: string
          recipe_id: string
          source_id: string
        }
        Update: {
          id?: string
          recipe_id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_sources_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_translations: {
        Row: {
          description: string
          disclaimer: string | null
          id: string
          instructions: string[]
          locale: Database["public"]["Enums"]["supported_locale"]
          recipe_id: string
          title: string
          why_recommended: string
        }
        Insert: {
          description?: string
          disclaimer?: string | null
          id?: string
          instructions?: string[]
          locale: Database["public"]["Enums"]["supported_locale"]
          recipe_id: string
          title: string
          why_recommended?: string
        }
        Update: {
          description?: string
          disclaimer?: string | null
          id?: string
          instructions?: string[]
          locale?: Database["public"]["Enums"]["supported_locale"]
          recipe_id?: string
          title?: string
          why_recommended?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_translations_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          child_friendly: boolean
          created_at: string
          id: string
          prep_time_minutes: number
          primary_goal_id: string | null
          servings: number
          taste_berry: boolean
          taste_creamy: boolean
          taste_fresh: boolean
          taste_full_bodied: boolean
          taste_green: boolean
          taste_mild: boolean
          taste_spiced: boolean
          taste_sweet: boolean
          updated_at: string
        }
        Insert: {
          child_friendly?: boolean
          created_at?: string
          id?: string
          prep_time_minutes?: number
          primary_goal_id?: string | null
          servings?: number
          taste_berry?: boolean
          taste_creamy?: boolean
          taste_fresh?: boolean
          taste_full_bodied?: boolean
          taste_green?: boolean
          taste_mild?: boolean
          taste_spiced?: boolean
          taste_sweet?: boolean
          updated_at?: string
        }
        Update: {
          child_friendly?: boolean
          created_at?: string
          id?: string
          prep_time_minutes?: number
          primary_goal_id?: string | null
          servings?: number
          taste_berry?: boolean
          taste_creamy?: boolean
          taste_fresh?: boolean
          taste_full_bodied?: boolean
          taste_green?: boolean
          taste_mild?: boolean
          taste_spiced?: boolean
          taste_sweet?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_primary_goal_id_fkey"
            columns: ["primary_goal_id"]
            isOneToOne: false
            referencedRelation: "health_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_recipe_ingredients: {
        Row: {
          amount: string
          id: string
          ingredient: string
          recipe_id: string
          sort_order: number
        }
        Insert: {
          amount?: string
          id?: string
          ingredient: string
          recipe_id: string
          sort_order?: number
        }
        Update: {
          amount?: string
          id?: string
          ingredient?: string
          recipe_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "sleep_recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "sleep_recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_recipe_sources: {
        Row: {
          id: string
          recipe_id: string
          source_id: string
        }
        Insert: {
          id?: string
          recipe_id: string
          source_id: string
        }
        Update: {
          id?: string
          recipe_id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_recipe_sources_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "sleep_recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleep_recipe_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sleep_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_recipes: {
        Row: {
          base: string
          benefits: string
          category: string
          created_at: string
          description: string
          id: string
          instructions: string
          locale: string
          prep_minutes: number
          servings: number
          symptom_tags: string[]
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          base?: string
          benefits?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          instructions?: string
          locale?: string
          prep_minutes?: number
          servings?: number
          symptom_tags?: string[]
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          base?: string
          benefits?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          instructions?: string
          locale?: string
          prep_minutes?: number
          servings?: number
          symptom_tags?: string[]
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sleep_sources: {
        Row: {
          created_at: string
          id: string
          notes: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string
          id: string
          title: string
          type: Database["public"]["Enums"]["source_type"]
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          type?: Database["public"]["Enums"]["source_type"]
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["source_type"]
          url?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_pantry: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_pantry_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pairing_type: "classic" | "complementary" | "experimental"
      source_type: "study" | "guideline" | "book" | "article"
      supported_locale: "en" | "sv" | "fr" | "es" | "it" | "ro" | "de"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pairing_type: ["classic", "complementary", "experimental"],
      source_type: ["study", "guideline", "book", "article"],
      supported_locale: ["en", "sv", "fr", "es", "it", "ro", "de"],
    },
  },
} as const
