import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { MouseEventHandler } from 'react';

interface DialogProps {
  opened: boolean;
  title: string;
  description?: string;
  actionButtonTitle: string;
  onAction: MouseEventHandler<HTMLButtonElement>;
}

export const Dialog = ({
  opened,
  onAction,
  title,
  actionButtonTitle,
  description,
}: DialogProps) => (
  <AlertDialog.Root open={opened}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className='bg-black fixed inset-0 opacity-50' />
      <AlertDialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 px-10 rounded  bg-white shadow-lg'>
        <AlertDialog.Title className='font-medium text-lg'>
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description className='my-5'>
          {description}
        </AlertDialog.Description>
        <AlertDialog.Action
          className='bg-slate-800 text-white px-3 py-2 rounded hover:opacity-90 transition-all duration-200'
          onClick={onAction}
          asChild
        >
          <button>{actionButtonTitle}</button>
        </AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
