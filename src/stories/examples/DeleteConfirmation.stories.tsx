import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Examples/Delete Confirmation",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertDialogExample: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Delete Confirmation - Alert Dialog</CardTitle>
        <CardDescription>
          Simple alert dialog for delete confirmation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold">Summer Campaign 2024</h4>
              <p className="text-sm text-muted-foreground">
                Published • Jun 15, 2024
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the campaign "Summer Campaign 2024" and remove all
                    associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const DialogWithWarning: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Delete Confirmation - With Warning</CardTitle>
        <CardDescription>
          Dialog with warning message and additional context
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold">Partner: TechCorp Solutions</h4>
              <p className="text-sm text-muted-foreground">
                Active • Has 3 linked campaigns
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Partner?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This partner is currently linked to 3 active campaigns.
                      Deleting it may affect those campaigns.
                    </AlertDescription>
                  </Alert>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Affected items:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Summer Sale 2024</li>
                      <li>New Product Launch</li>
                      <li>Webinar Series</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete Partner</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const RequireConfirmationText: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Delete Confirmation - Type to Confirm</CardTitle>
        <CardDescription>
          Requires typing confirmation text for sensitive actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold">Production Database</h4>
              <p className="text-sm text-muted-foreground">Critical System</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Database?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All data will be permanently
                    lost.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTitle>Critical Action</AlertTitle>
                    <AlertDescription>
                      You are about to delete a production database. This action
                      is irreversible and cannot be undone.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-text">
                      Type <span className="font-sans font-bold">DELETE</span>{" "}
                      to confirm
                    </Label>
                    <Input
                      id="confirm-text"
                      placeholder="Type DELETE"
                      className="font-sans"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" disabled>
                    I understand, delete this database
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const BulkDeleteConfirmation: Story = {
  render: () => {
    const selectedItems = [
      "Summer Campaign 2024",
      "Flash Sale 9.9",
      "New Product Launch",
      "Webinar Series",
    ];

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Delete Confirmation - Bulk Delete</CardTitle>
          <CardDescription>
            Confirm deletion of multiple items at once
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Multiple Items Selected</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedItems.length} campaigns selected
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete {selectedItems.length} Campaigns?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The following campaigns will
                      be permanently deleted:
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm p-2 bg-muted rounded"
                      >
                        <span className="text-muted-foreground">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete All Campaigns
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const InPageDelete: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Delete Confirmation - In Page</CardTitle>
        <CardDescription>
          Delete confirmation shown inline within the page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Danger Zone</AlertTitle>
            <AlertDescription>
              Once you delete a form template, there is no going back. Please be
              certain.
            </AlertDescription>
          </Alert>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm">Contact Us Form</h4>
                <p className="text-xs text-muted-foreground">
                  Published • 12 submissions
                </p>
              </div>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm">
                  Event Registration Form
                </h4>
                <p className="text-xs text-muted-foreground">
                  Draft • 0 submissions
                </p>
              </div>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm">Feedback Survey</h4>
                <p className="text-xs text-muted-foreground">
                  Published • 45 submissions
                </p>
              </div>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};
