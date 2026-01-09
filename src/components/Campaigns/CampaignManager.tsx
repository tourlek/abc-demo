
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LineAccount } from '../types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

export const CampaignManager: React.FC = () => {
  const [accounts, setAccounts] = useState<LineAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load accounts and selection from storage
  useEffect(() => {
    const savedAccounts = localStorage.getItem('line_accounts');
    const savedSelection = localStorage.getItem('selected_account_id');
    
    let parsedAccounts: LineAccount[] = [];

    if (savedAccounts) {
        try {
            parsedAccounts = JSON.parse(savedAccounts);
            setAccounts(parsedAccounts);
        } catch (e) {
            console.error(e);
        }
    }
    
    if (parsedAccounts.length > 0) {
        if (savedSelection && parsedAccounts.find(a => a.id === savedSelection)) {
            setSelectedAccountId(savedSelection);
        } else {
            setSelectedAccountId(parsedAccounts[0].id);
            localStorage.setItem('selected_account_id', parsedAccounts[0].id);
        }
    }
    
    setIsLoading(false);
  }, []);

  const handleAccountChange = (id: string) => {
      setSelectedAccountId(id);
      localStorage.setItem('selected_account_id', id);
  };

  const selectedAccount = accounts.find(a => a.id === selectedAccountId);

  if (isLoading) return <div>Loading...</div>;

  // Empty State: No Accounts Configured
  if (accounts.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">LINE OA Not Configured</h1>
              <p className="text-muted-foreground max-w-md">
                  To start creating campaigns, you need to connect at least one LINE Official Account in the Settings menu.
              </p>
              <Link to="/settings">
                <Button size="lg" className="mt-4">Go to Settings</Button>
              </Link>
          </div>
      );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header with Account Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
             <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Campaigns</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage Rich Menus and Broadcasts.</p>
             </div>
             
             <div className="flex items-center gap-2">
                 <div className="w-[240px]">
                    <Select value={selectedAccountId} onValueChange={handleAccountChange}>
                        <SelectTrigger className="bg-card">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Account:</span>
                                <SelectValue placeholder="Select Account">
                                    {selectedAccount?.name}
                                </SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map(acc => (
                                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-green-500" title="Connected"></div>
             </div>
        </div>
        
        {/* Dashboard Content for Selected Account */}
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:border-primary transition-all cursor-pointer group hover:shadow-md border-border">
                <CardContent className="p-8 flex flex-col items-start space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                          <line x1="3" y1="9" x2="21" y2="9"/>
                          <line x1="9" y1="21" x2="9" y2="9"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-lg text-foreground">Rich Menu Maker</h3>
                        <p className="text-sm text-muted-foreground mt-1">Design and publish rich menus for <span className="font-semibold text-foreground">{selectedAccount?.name}</span>.</p>
                    </div>
                    {/* Link to List Page */}
                    <Link to="/campaigns/rich-menus" className="w-full">
                        <Button variant="secondary" className="w-full mt-4">Manage Menus</Button>
                    </Link>
                </CardContent>
            </Card>

            <Card className="hover:border-primary transition-all cursor-pointer group hover:shadow-md border-border">
                 <CardContent className="p-8 flex flex-col items-start space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 11 18-5v12L3 14v-3z"/>
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-lg text-foreground">Broadcast & Banners</h3>
                        <p className="text-sm text-muted-foreground mt-1">Send messages or render LIFF banners in your main app.</p>
                    </div>
                    <Link to="/campaigns/list" className="w-full">
                        <Button variant="secondary" className="w-full mt-4">Manage Campaigns</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-lg flex gap-3 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-500 mt-0.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
                <h4 className="font-bold text-amber-800 dark:text-amber-200 text-sm">Dependency Note</h4>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Ensure "Landing Page" module setup is complete before linking Banner Campaigns to specific page slugs.
                </p>
            </div>
        </div>

        {/* Info Footer */}
        <div className="text-xs text-muted-foreground text-center font-mono mt-8">
            CID: {selectedAccount?.credentials.channelId}
        </div>
    </div>
  );
};
