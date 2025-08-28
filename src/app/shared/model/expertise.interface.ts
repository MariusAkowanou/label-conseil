export interface ExpertiseConfig {
    expertises: Expertise[];
}

export interface Expertise {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    heroImage: string;
    description: string;
    detailedDescription: string;
    marketContext: {
        title: string;
        content: string;
    };
    recruitment: {
        title: string;
        categories: RecruitmentCategory[];
    };
    statistics: {
        recruitmentsPerYear: string;
        clientTypes: string;
    };
}

export interface RecruitmentCategory {
    title: string;
    positions: string[];
}