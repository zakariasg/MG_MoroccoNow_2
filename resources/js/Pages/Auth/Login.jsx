import AuthSplitLayout from '@/Layouts/AuthSplitLayout';
import AuthTabs from '@/Components/AuthTabs';
import IconInput from '@/Components/IconInput';
import InputError from '@/Components/InputError';
import { EnvelopeIcon, LockIcon } from '@/Components/AuthIcons';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSplitLayout>
            <Head title="Log in" />

            <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">
                Nice to see you again
            </h1>

            <AuthTabs active="login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <IconInput
                        icon={<EnvelopeIcon />}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <IconInput
                        icon={<LockIcon />}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-teal-700 focus:ring-teal-700"
                        />
                        Remember me
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-full bg-teal-700 py-3.5 text-white font-semibold text-base transition hover:bg-teal-800 disabled:opacity-50 mt-2"
                >
                    Login
                </button>
            </form>
        </AuthSplitLayout>
    );
}