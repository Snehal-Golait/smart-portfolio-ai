export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

export interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  stack: string[];
  stackColor: 'cyan' | 'purple' | 'green';
  github: string;
  image: string;
}

export interface Skill {
  category: string;
  icon: string;
  tags: string[];
}

export interface ChatState {
  sessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
}
