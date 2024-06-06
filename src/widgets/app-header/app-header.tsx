import { Button } from "@/shared/ui/button";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";
import { HelpCircle } from "lucide-react";
import { ToggleTheme } from "@/features/theme/toggle-theme";

export function AppHeader({variant}: {
  variant: 'auth' | 'private' | 'public';
}) {
  const isProfile = variant !== "auth";
  return (
    <Layout
      logo={<Logo />}
      nav={<MainNav />}
      profile={isProfile && <Profile />}
      actions={<ToggleTheme/>}
    />
  );
}