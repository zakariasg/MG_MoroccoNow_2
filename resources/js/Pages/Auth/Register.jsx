import AuthSplitLayout from '@/Layouts/AuthSplitLayout';
import AuthTabs from '@/Components/AuthTabs';
import IconInput from '@/Components/IconInput';
import InputError from '@/Components/InputError';
import { EnvelopeIcon, LockIcon, UserIcon } from '@/Components/AuthIcons';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthSplitLayout>
            <Head title="Register" />

            <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">
                Create your account
            </h1>

            <AuthTabs active="register" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <IconInput
                        icon={<UserIcon />}
                        id="name"
                        name="name"
                        placeholder="Full name"
                        value={data.name}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <IconInput
                        icon={<EnvelopeIcon />}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <IconInput
                        icon={<LockIcon />}
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-full bg-teal-700 py-3.5 text-white font-semibold text-base transition hover:bg-teal-800 disabled:opacity-50 mt-2"
                >
                    Create account
                </button>
            </form>
        </AuthSplitLayout>
    );
}