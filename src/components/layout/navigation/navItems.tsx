
import { Heart, Info, Shield, Ambulance, User, FileText, Vote, Award, Users, UserCheck, Trash2, DollarSign } from 'lucide-react';
import { UserRole } from '@/hooks/useUserRole';

export type BaseNavItem = {
  title: string;
  icon: React.ReactNode;
};

export type LinkNavItem = BaseNavItem & {
  path: string;
  dropdown?: never;
};

export type DropdownNavItem = BaseNavItem & {
  dropdown: true;
  children?: Array<{
    title: string;
    icon: React.ReactNode;
    path: string;
  }>;
  path?: never;
};

export type NavItem = LinkNavItem | DropdownNavItem;

export const getNavigationItems = (userRole: UserRole): NavItem[] => {
  const commonLinks: NavItem[] = [
    {
      title: 'Browse Campaign',
      path: '/campaigns',
      icon: <Heart className="text-medical-green" size={20} />
    },
    {
      title: 'How It Works',
      path: '/how-it-works',
      icon: <Info size={20} />
    }
  ];

  if (userRole === UserRole.Owner) {
    return [
      ...commonLinks,
      {
        title: 'Verification Portal',
        path: '/verification',
        icon: <Shield size={20} />
      },
      {
        title: 'Emergency Portal',
        path: '/emergency',
        icon: <Ambulance size={20} />
      }
    ];
  } else if (userRole === UserRole.Verifier) {
    return [
      ...commonLinks,
      {
        title: 'Become Verifier',
        dropdown: true,
        icon: <User size={20} />,
        children: [
          {
            title: "Apply as Genesis Member",
            icon: <Shield className="mr-2" size={18} />,
            path: "/apply/genesis"
          },
          {
            title: "Apply as Health Professional",
            icon: <UserCheck className="mr-2" size={18} />,
            path: "/apply/health"
          },
          {
            title: "Apply as DAO",
            icon: <Users className="mr-2" size={18} />,
            path: "/apply/dao"
          }
        ]
      },
      {
        title: 'Proposal Portal',
        dropdown: true,
        icon: <FileText size={20} />,
        children: [
          {
            title: "Revocation Proposal",
            icon: <Trash2 className="mr-2" size={18} />,
            path: "/proposals/revocation"
          },
          {
            title: "Fee Proposal",
            icon: <DollarSign className="mr-2" size={18} />,
            path: "/proposals/fee"
          }
        ]
      },
      {
        title: 'Vote Portal',
        path: '/vote',
        icon: <Vote size={20} />
      },
      {
        title: 'Claim Reward',
        path: '/rewards',
        icon: <Award size={20} />
      }
    ];
  } else {
    return [
      ...commonLinks,
      {
        title: 'Become Verifier',
        dropdown: true,
        icon: <User size={20} />,
        children: [
          {
            title: "Apply as Genesis Member",
            icon: <Shield className="mr-2" size={18} />,
            path: "/apply/genesis"
          },
          {
            title: "Apply as Health Professional",
            icon: <UserCheck className="mr-2" size={18} />,
            path: "/apply/health"
          },
          {
            title: "Apply as DAO",
            icon: <Users className="mr-2" size={18} />,
            path: "/apply/dao"
          }
        ]
      }
    ];
  }
};
