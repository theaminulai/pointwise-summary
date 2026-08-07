import type * as React from 'react';
import { Title } from '../common';
import { ContactSupport } from './ContactSupport';
import { DocumentationLinks } from './DocumentationLinks';
import { FAQs } from './FAQs';
import { QuickStartGuide } from './QuickStartGuide';
import { SystemInfo } from './SystemInfo';

export const Help: React.FC = () => {
	return (
		<div className="space-y-6 lg:space-y-8">
			{ /* Header */ }
			<Title
				title="Help & Support"
				description="Everything you need to get started with Pointwise Summary"
			/>

			<QuickStartGuide />
			<DocumentationLinks />
			<FAQs />
			{ /* <ShortcodeExamples /> */ }
			<SystemInfo />
			<ContactSupport />
		</div>
	);
};
