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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      activity_days: {
        Row: {
          day: string
          student_id: string
        }
        Insert: {
          day: string
          student_id: string
        }
        Update: {
          day?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_days_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          class_id: string
          content: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          class_id: string
          content: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          class_id?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          bonus_points: number
          code: string
          color: string
          course_id: string | null
          criteria: Database["public"]["Enums"]["badge_criteria"]
          criteria_value: number | null
          description: string
          icon: string
          id: string
          module_id: string | null
          name: string
          order_index: number
        }
        Insert: {
          bonus_points?: number
          code: string
          color?: string
          course_id?: string | null
          criteria: Database["public"]["Enums"]["badge_criteria"]
          criteria_value?: number | null
          description: string
          icon: string
          id?: string
          module_id?: string | null
          name: string
          order_index?: number
        }
        Update: {
          bonus_points?: number
          code?: string
          color?: string
          course_id?: string | null
          criteria?: Database["public"]["Enums"]["badge_criteria"]
          criteria_value?: number | null
          description?: string
          icon?: string
          id?: string
          module_id?: string | null
          name?: string
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "badges_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "badges_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      class_courses: {
        Row: {
          assigned_at: string
          class_id: string
          course_id: string
        }
        Insert: {
          assigned_at?: string
          class_id: string
          course_id: string
        }
        Update: {
          assigned_at?: string
          class_id?: string
          course_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_courses_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          id: string
          join_code: string
          leaderboard_enabled: boolean
          name: string
          teacher_id: string
          weekly_goal: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          join_code: string
          leaderboard_enabled?: boolean
          name: string
          teacher_id: string
          weekly_goal?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          join_code?: string
          leaderboard_enabled?: boolean
          name?: string
          teacher_id?: string
          weekly_goal?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          color: string
          cover_image: string | null
          created_at: string
          default_code_language: string
          description: string | null
          icon: string
          id: string
          is_published: boolean
          order_index: number
          platform: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          color?: string
          cover_image?: string | null
          created_at?: string
          default_code_language?: string
          description?: string | null
          icon?: string
          id?: string
          is_published?: boolean
          order_index?: number
          platform?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          cover_image?: string | null
          created_at?: string
          default_code_language?: string
          description?: string | null
          icon?: string
          id?: string
          is_published?: boolean
          order_index?: number
          platform?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          last_viewed_at: string
          lesson_id: string
          started_at: string
          status: Database["public"]["Enums"]["progress_status"]
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          last_viewed_at?: string
          lesson_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["progress_status"]
          student_id: string
        }
        Update: {
          completed_at?: string | null
          last_viewed_at?: string
          lesson_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["progress_status"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          code_language: string
          content: string
          created_at: string
          estimated_minutes: number
          example_code: string | null
          id: string
          is_published: boolean
          materials: string[]
          module_id: string
          order_index: number
          points: number
          slug: string
          summary: string | null
          title: string
          tool_label: string | null
          tool_url: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          code_language?: string
          content?: string
          created_at?: string
          estimated_minutes?: number
          example_code?: string | null
          id?: string
          is_published?: boolean
          materials?: string[]
          module_id: string
          order_index?: number
          points?: number
          slug: string
          summary?: string | null
          title: string
          tool_label?: string | null
          tool_url?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          code_language?: string
          content?: string
          created_at?: string
          estimated_minutes?: number
          example_code?: string | null
          id?: string
          is_published?: boolean
          materials?: string[]
          module_id?: string
          order_index?: number
          points?: number
          slug?: string
          summary?: string | null
          title?: string
          tool_label?: string | null
          tool_url?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          color: string
          course_id: string
          created_at: string
          description: string | null
          icon: string
          id: string
          is_published: boolean
          is_sequential: boolean
          order_index: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          color?: string
          course_id: string
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_published?: boolean
          is_sequential?: boolean
          order_index?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          course_id?: string
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_published?: boolean
          is_sequential?: boolean
          order_index?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      point_events: {
        Row: {
          amount: number
          created_at: string
          id: number
          lesson_id: string | null
          module_id: string | null
          note: string | null
          reason: string
          student_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: never
          lesson_id?: string | null
          module_id?: string | null
          note?: string | null
          reason: string
          student_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: never
          lesson_id?: string | null
          module_id?: string | null
          note?: string | null
          reason?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_events_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_events_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_events_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string
          class_id: string | null
          created_at: string
          display_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          total_points: number
          username: string
        }
        Insert: {
          avatar?: string
          class_id?: string | null
          created_at?: string
          display_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          total_points?: number
          username: string
        }
        Update: {
          avatar?: string
          class_id?: string | null
          created_at?: string
          display_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          total_points?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      student_badges: {
        Row: {
          badge_id: string
          earned_at: string
          seen: boolean
          student_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          seen?: boolean
          student_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          seen?: boolean
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_course: { Args: { course: string }; Returns: boolean }
      check_class_code: { Args: { p_code: string }; Returns: string }
      complete_lesson: { Args: { p_lesson_id: string }; Returns: Json }
      evaluate_badges: {
        Args: { p_student: string }
        Returns: {
          bonus_points: number
          code: string
          color: string
          course_id: string | null
          criteria: Database["public"]["Enums"]["badge_criteria"]
          criteria_value: number | null
          description: string
          icon: string
          id: string
          module_id: string | null
          name: string
          order_index: number
        }[]
        SetofOptions: {
          from: "*"
          to: "badges"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_class_leaderboard: {
        Args: never
        Returns: {
          avatar: string
          badge_count: number
          display_name: string
          is_me: boolean
          total_points: number
        }[]
      }
      get_class_weekly_progress: { Args: never; Returns: Json }
      get_resume_target: { Args: { p_course_id?: string }; Returns: Json }
      get_student_courses: { Args: never; Returns: Json }
      is_teacher: { Args: never; Returns: boolean }
      mark_badges_seen: { Args: never; Returns: undefined }
      mark_lesson_viewed: { Args: { p_lesson_id: string }; Returns: undefined }
      teacher_add_bonus: {
        Args: { p_amount: number; p_note: string; p_student: string }
        Returns: Json
      }
      teacher_update_student_class: {
        Args: { p_class_id: string; p_student: string }
        Returns: undefined
      }
      teaches_student: { Args: { student: string }; Returns: boolean }
    }
    Enums: {
      badge_criteria:
        | "first_lesson"
        | "lessons_completed"
        | "module_completed"
        | "course_completed"
        | "points_total"
        | "streak_days"
      progress_status: "in_progress" | "completed"
      user_role: "student" | "teacher"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      badge_criteria: [
        "first_lesson",
        "lessons_completed",
        "module_completed",
        "course_completed",
        "points_total",
        "streak_days",
      ],
      progress_status: ["in_progress", "completed"],
      user_role: ["student", "teacher"],
    },
  },
} as const
