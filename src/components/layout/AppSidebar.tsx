
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { 
  Heart, 
  User, 
  Users, 
  ShieldCheck, 
  File 
} from 'lucide-react';

export function AppSidebar() {
  // Menu items for navigation
  const menuItems = [
    {
      title: 'Dashboard',
      icon: Heart,
      url: '/'
    },
    {
      title: 'Apply as Genesis',
      icon: ShieldCheck,
      url: '/apply/genesis'
    },
    {
      title: 'Apply as Health Pro',
      icon: User,
      url: '/apply/health'
    },
    {
      title: 'Apply as DAO',
      icon: Users,
      url: '/apply/dao'
    },
    {
      title: 'Contract Details',
      icon: File,
      url: '/contract'
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="py-6 px-3">
          <h2 className="text-lg font-bold text-medical-blue flex items-center gap-2">
            <Heart className="text-medical-green" size={20} />
            MedTrust Verify
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Medical Verification Platform
          </p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon size={18} className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
