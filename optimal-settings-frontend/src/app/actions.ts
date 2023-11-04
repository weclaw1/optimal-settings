'use server'

import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
    const search = formData.get('search');
    redirect(`/games?search=${search}`);
}