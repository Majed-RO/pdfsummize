'use client';

import { useEffect } from 'react';
import { CustomToast } from './custom-toast';
import { useRouter } from 'next/navigation';

const ToastPlacer = ({
	message
}: {
	message: {
		title: string;
		description: string;
	};
}) => {
  const router = useRouter();

	useEffect(() => {
		if (message) {
			CustomToast(message.title, {
				description: message.description,
				duration: 7000
			});
		}
	}, [message]);

	return null;
};

export default ToastPlacer;
