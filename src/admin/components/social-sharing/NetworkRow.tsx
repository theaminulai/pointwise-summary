import { __ } from '@wordpress/i18n';
import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';
import { useEffect, useId, useState } from 'react';
import type { SocialNetworkState } from '../../store/types';
import { Toggle } from '../common';

export interface NetworkWithIcon extends SocialNetworkState {
	icon: LucideIcon;
}

interface NetworkRowProps {
	network: NetworkWithIcon;
	onToggle: ( id: string ) => void;
	onMentionChange: ( id: string, mention: string ) => void;
}

export const NetworkRow: React.FC< NetworkRowProps > = ( {
	network,
	onToggle,
	onMentionChange,
}: NetworkRowProps ) => {
	const Icon = network.icon;
	const showMentionInput = network.mentionOption && network.enabled;
	const mentionInputId = useId();
	const [ mentionValue, setMentionValue ] = useState( network.mention );

	const handleMentionChange = (
		e: React.ChangeEvent< HTMLInputElement >
	) => {
		setMentionValue( e.target.value );
		onMentionChange( network.id, e.target.value );
	};

	useEffect( () => {
		setMentionValue( network.mention );
	}, [ network.mention ] );

	return (
		<div className="p-6">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start gap-4 flex-1">
					<div
						style={ {
							backgroundColor: network.color,
						} }
						className={ `w-12 h-12 rounded-lg flex items-center justify-center` }
					>
						<Icon className="w-6 h-6 text-white" />
					</div>

					<div className="flex-1">
						<h4 className="text-gray-900">{ network.name }</h4>

						{ showMentionInput && (
							<div className="mt-3">
								<label
									htmlFor={ mentionInputId }
									className="block text-sm text-gray-700 mb-1"
								>
									{ __(
										'Mention (optional)',
										'pointwise-summary'
									) }
								</label>
								<input
									id={ mentionInputId }
									type="text"
									value={ mentionValue }
									onChange={ handleMentionChange }
									placeholder={ __(
										'@yourhandle',
										'pointwise-summary'
									) }
									className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						) }
					</div>
				</div>

				<Toggle
					checked={ network.enabled }
					onChange={ () => onToggle( network.id ) }
				/>
			</div>
		</div>
	);
};
