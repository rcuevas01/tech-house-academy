import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 to-indigo-900 flex flex-col justify-center items-center">
            <Head>
                <title>Tech House Academy</title>
                <meta name="description" content="Tech House Academy - Learn and groove to the tech house beats!" />
            </Head>
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <h1 className="text-5xl font-bold text-white mb-6">Welcome to Tech House Academy</h1>
            </motion.div>
            <p className="text-lg text-gray-200 mb-8">Learn to make music like the pros!</p>
            <Link href="/explore">
                
                    Start Exploring
                
            </Link>
        </div>
    );
};

export default LandingPage;