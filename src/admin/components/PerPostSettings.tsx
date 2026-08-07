import { Edit, Eye, Save, Search, X } from 'lucide-react';
import { useId, useState } from 'react';
import { Checkbox, Select, Title } from '../components/common';

const posts = [
	{
		id: 1,
		title: 'Getting Started with WordPress Development',
		status: 'Published',
		customized: true,
	},
	{
		id: 2,
		title: 'Top 10 SEO Tips for 2026',
		status: 'Published',
		customized: false,
	},
	{
		id: 3,
		title: 'Understanding React Hooks',
		status: 'Draft',
		customized: true,
	},
	{
		id: 4,
		title: 'CSS Grid vs Flexbox',
		status: 'Published',
		customized: false,
	},
	{
		id: 5,
		title: 'JavaScript Best Practices',
		status: 'Published',
		customized: false,
	},
];

export function PerPostSettings() {
	const customPromptId = useId();
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ selectedPost, setSelectedPost ] = useState< number | null >( null );
	const [ customPrompt, setCustomPrompt ] = useState( '' );
	const [ summaryLength, setSummaryLength ] = useState( 'medium' );
	const [ displayPosition, setDisplayPosition ] = useState( 'default' );
	const [ enabledAI, setEnabledAI ] = useState( {
		chatgpt: true,
		gemini: true,
		claude: false,
		perplexity: false,
	} );

	const filteredPosts = posts.filter( ( post ) =>
		post.title.toLowerCase().includes( searchQuery.toLowerCase() )
	);

	const handleEditPost = ( postId: number ) => {
		setSelectedPost( postId );
		// In real implementation, load existing settings for this post
	};

	const handleSave = () => {
		// Save per-post settings
		setSelectedPost( null );
	};

	return (
		<div className="space-y-8">
			{ /* Header */ }
			<Title
				title="Per-Post Settings"
				description="Customize AI summary settings for individual posts and pages"
			/>

			{ selectedPost === null ? (
				<>
					{ /* Search */ }
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								value={ searchQuery }
								onChange={ ( e ) =>
									setSearchQuery( e.target.value )
								}
								placeholder="Search posts and pages..."
								className="w-full pl-10! pr-4! py-3! border! border-gray-300! rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					</div>

					{ /* Posts List */ }
					<div className="bg-white rounded-lg shadow-sm border border-gray-200">
						<div className="p-6 border-b border-gray-200">
							<h3 className="text-gray-900">Posts & Pages</h3>
							<p className="text-sm text-gray-600 mt-1">
								{ filteredPosts.length } items found
							</p>
						</div>

						<div className="divide-y divide-gray-200">
							{ filteredPosts.map( ( post ) => (
								<div
									key={ post.id }
									className="p-6 hover:bg-gray-50 transition-colors"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h4 className="text-gray-900">
													{ post.title }
												</h4>
												{ post.customized && (
													<span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
														Customized
													</span>
												) }
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span>ID: { post.id }</span>
												<span
													className={ `px-2 py-0.5 rounded text-xs ${
														post.status ===
														'Published'
															? 'bg-green-100 text-green-700'
															: 'bg-yellow-100 text-yellow-700'
													}` }
												>
													{ post.status }
												</span>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
												<Eye className="w-4 h-4" />
											</button>
											<button
												onClick={ () =>
													handleEditPost( post.id )
												}
												className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
											>
												<Edit className="w-4 h-4" />
												Customize
											</button>
										</div>
									</div>
								</div>
							) ) }
						</div>
					</div>
				</>
			) : (
				<>
					{ /* Edit Mode */ }
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<div>
								<h3 className="text-gray-900">
									Editing:{ ' ' }
									{
										posts.find(
											( p ) => p.id === selectedPost
										)?.title
									}
								</h3>
								<p className="text-sm text-gray-600 mt-1">
									Customize AI summary settings for this post
								</p>
							</div>
							<button
								onClick={ () => setSelectedPost( null ) }
								className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="space-y-6">
							{ /* Custom Prompt */ }
							<div>
								<label
									htmlFor={ customPromptId }
									className="block text-sm font-medium text-gray-900 mb-2"
								>
									Custom Prompt for This Post
								</label>
								<textarea
									id={ customPromptId }
									value={ customPrompt }
									onChange={ ( e ) =>
										setCustomPrompt( e.target.value )
									}
									rows={ 4 }
									placeholder="Enter a custom prompt specific to this post, or leave blank to use default..."
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
								<p className="text-xs text-gray-500 mt-1">
									This prompt will override the global default
									for this post only
								</p>
							</div>

							{ /* Summary Length */ }
							<Select
								label="Summary Length"
								value={ summaryLength }
								onChange={ setSummaryLength }
								options={ [
									{
										value: 'default',
										label: 'Use Default Setting',
									},
									{
										value: 'short',
										label: 'Short (2-3 points)',
									},
									{
										value: 'medium',
										label: 'Medium (3-5 points)',
									},
									{
										value: 'detailed',
										label: 'Detailed (5-7 points)',
									},
								] }
								className="max-w-md"
							/>

							{ /* Display Position */ }
							<Select
								label="Display Position"
								value={ displayPosition }
								onChange={ setDisplayPosition }
								options={ [
									{
										value: 'default',
										label: 'Use Default Setting',
									},
									{
										value: 'before-title',
										label: 'Before Title',
									},
									{
										value: 'after-title',
										label: 'After Title',
									},
									{
										value: 'before-content',
										label: 'Before Content',
									},
									{
										value: 'after-content',
										label: 'After Content',
									},
									{
										value: 'floating-only',
										label: 'Floating Button Only',
									},
									{
										value: 'disabled',
										label: 'Disable for This Post',
									},
								] }
								className="max-w-md"
							/>

							{ /* AI Platform Override */ }
							<div>
								<p className="block text-sm font-medium text-gray-900 mb-3">
									Enabled AI Platforms for This Post
								</p>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
									<Checkbox
										checked={ enabledAI.chatgpt }
										onChange={ ( checked ) =>
											setEnabledAI( {
												...enabledAI,
												chatgpt: checked,
											} )
										}
										label="ChatGPT"
									/>

									<Checkbox
										checked={ enabledAI.gemini }
										onChange={ ( checked ) =>
											setEnabledAI( {
												...enabledAI,
												gemini: checked,
											} )
										}
										label="Gemini"
									/>

									<Checkbox
										checked={ enabledAI.claude }
										onChange={ ( checked ) =>
											setEnabledAI( {
												...enabledAI,
												claude: checked,
											} )
										}
										label="Claude"
									/>

									<Checkbox
										checked={ enabledAI.perplexity }
										onChange={ ( checked ) =>
											setEnabledAI( {
												...enabledAI,
												perplexity: checked,
											} )
										}
										label="Perplexity"
									/>
								</div>
								<p className="text-xs text-gray-500 mt-2">
									Leave unchecked to use global AI platform
									settings
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
							<button
								onClick={ handleSave }
								className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
							>
								<Save className="w-5 h-5" />
								Save Post Settings
							</button>
							<button
								onClick={ () => setSelectedPost( null ) }
								className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
							>
								Cancel
							</button>
							<button className="ml-auto px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
								Reset to Default
							</button>
						</div>
					</div>
				</>
			) }
		</div>
	);
}
