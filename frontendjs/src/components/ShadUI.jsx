"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  RadioGroup,
  RadioGroupItem,
  Label,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Separator,
  AspectRatio,
  Skeleton,
  Alert,
  AlertDescription,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Avatar,
  AvatarFallback,
  Badge,
  Progress
} from "@/components/ui";

export default function ShadUI() {
  const [progress, setProgress] = useState(60);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🎨 ShadCN UI Showcase</h2>

      <Card className="shadow-xl">
        <CardContent className="p-6 space-y-8">
          {/* Basic Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Input placeholder="Your name" />
            <Textarea placeholder="Your message..." />
            <div className="flex items-center space-x-2">
              <Checkbox id="check" defaultChecked />
              <Label htmlFor="check">I agree</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Enable setting</Label>
            </div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">One</SelectItem>
                <SelectItem value="two">Two</SelectItem>
              </SelectContent>
            </Select>
            <Slider defaultValue={[60]} max={100} step={1} />
          </div>
          {/* Utility Components */}
          <Separator />
          {/* <AspectRatio ratio={2/ 2}>
            <div className="bg-muted rounded-md flex items-center justify-center">Aspect Ratio Box</div>
          </AspectRatio> */}
          <Skeleton className="w-48 h-6 rounded-md" />
          <Alert>
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>This is a generic alert.</AlertDescription>
          </Alert>

          {/* Sonner Toast */}
          <Button
            variant="secondary"
            onClick={() => toast("✅ Toast from Sonner!")}
          >
            Show Toast
          </Button>

          {/* Dialogs */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>This is a dialog.</DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button >Delete Something</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              Are you sure?
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button>Drawer</Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">Here’s the drawer content</DrawerContent>
          </Drawer>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Popover</Button>
            </PopoverTrigger>
            <PopoverContent>This is a popover box</PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip message</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Option A</DropdownMenuItem>
              <DropdownMenuItem>Option B</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ContextMenu>
            <ContextMenuTrigger className="border p-2 rounded-md">
              Right Click Area
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Menu 1</ContextMenuItem>
              <ContextMenuItem>Menu 2</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2">Nav Home</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Radio */}
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2">Option 2</Label>
            </div>
          </RadioGroup>

          {/* Tabs */}
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Info</TabsTrigger>
              <TabsTrigger value="tab2">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Tab One Content</TabsContent>
            <TabsContent value="tab2">Tab Two Content</TabsContent>
          </Tabs>

          {/* Accordion */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>More Info</AccordionTrigger>
              <AccordionContent>Details here...</AccordionContent>
            </AccordionItem>
          </Accordion>


          {/* Avatar, Badge, Progress */}
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Badge>Beta</Badge>
            <Progress value={progress} className="w-[60%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
