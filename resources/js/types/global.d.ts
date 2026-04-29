import type { Auth } from '@/types/auth';
import type { Team } from '@/types/teams';

declare global {
    function route(name: string, params?: any): string;
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            currentTeam: Team | null;
            teams: Team[];
            [key: string]: unknown;
        };
    }
}
