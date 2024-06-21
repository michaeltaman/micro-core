import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import { AvatarField } from './avatar-field';
import { Profile } from '@/entities/user/profile';

import { UserId } from '@/entities/user/user';
import { useUpdateProfile } from '../_vm/use-update-profile';

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, { message: 'Username must not be longer than 30 characters.' })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (profile: Profile) => ({
  email: profile.email ?? undefined,
  image: profile.image ?? undefined,
  name: profile.name ?? '',
});

const EmailField = ({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) => (
  <FormField
    control={control}
    name="email"
    disabled={disabled}
    render={({ field }) => (
      <FormItem>
        <FormLabel htmlFor={field.name}>Email</FormLabel>
        <FormControl>
          <Input
            id={field.name}
            placeholder="Enter your email"
            {...field}
            autoComplete="email" // autocomplete attribute added
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const NameField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel htmlFor={field.name}>Name</FormLabel>
        <FormControl>
          <Input
            id={field.name}
            placeholder="Enter your name"
            {...field}
            autoComplete="name" // autocomplete attribute added
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const ImageField = ({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) => (
  <FormField
    control={control}
    name="image"
    disabled={disabled}
    render={({ field }) => (
      <FormItem>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <FormControl>
          <AvatarField
             id="avatar"
            value={field.value}
            onChange={field.onChange}
             autoComplete="photo" // autocomplete attribute added
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export function ProfileForm({
  onSuccess,
  submitText = 'Save',
  profile,
  userId,
}: {
  userId: UserId;
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfile();

  const handleSubmit = form.handleSubmit(async (data) => {
    const newProfile = await updateProfile.update({
      userId,
      data,
    });

    form.reset(getDefaultValues(newProfile.profile));
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <EmailField control={form.control} disabled={false} />
        <NameField control={form.control} />
        <ImageField control={form.control} disabled={false} />
        <Button type="submit">
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Profile update"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
