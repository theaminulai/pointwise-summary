import { __, sprintf } from '@wordpress/i18n';
import type { LucideIcon } from 'lucide-react';
import {
	Bookmark,
	Facebook,
	Linkedin,
	Mail,
	Send,
	Twitter,
} from 'lucide-react';
import type * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocialSharingUpdate } from '../../hooks/useSocialSharingUpdate';
import {
	toggleNetwork,
	updateNetworkMention,
} from '../../store/socialSharing.actions';
import type { RootState } from '../../store/types';
import { NetworkRow, type NetworkWithIcon } from './NetworkRow';
// add to imports
import { useDebounce } from '@wordpress/compose';
import { Whatsapp } from '../icons';
const ICON_MAP: Record< string, LucideIcon > = {
	twitter: Twitter,
	linkedin: Linkedin,
	facebook: Facebook,
	telegram: Send,
	whatsapp: Whatsapp,
	email: Mail,
	raindrop: Bookmark,
};

export const SocialNetworks: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useSocialSharingUpdate();
	const networks = useSelector(
		( state: RootState ) => state.socialSharing.networks
	);

	const networksWithIcons = useMemo< NetworkWithIcon[] >(
		() =>
			networks.map( ( network ) => ( {
				...network,
				icon: ICON_MAP[ network.iconKey ],
			} ) ),
		[ networks ]
	);

	const enabledCount = useMemo(
		() => networks.filter( ( n ) => n.enabled ).length,
		[ networks ]
	);

	const handleToggleNetwork = useCallback(
		( id: string ) => {
			const nextNetworks = networks.map( ( n ) =>
				n.id === id ? { ...n, enabled: ! n.enabled } : n
			);
			dispatch( toggleNetwork( id ) );
			void persistSettings( { networks: nextNetworks } );
		},
		[ dispatch, networks, persistSettings ]
	);

	const handleUpdateMention = useCallback(
		( id: string, mention: string ) => {
			const nextNetworks = networks.map( ( n ) =>
				n.id === id ? { ...n, mention } : n
			);
			dispatch( updateNetworkMention( id, mention ) );
			void persistSettings( { networks: nextNetworks } );
		},
		[ dispatch, networks, persistSettings ]
	);
	const debouncedUpdateMention = useDebounce( handleUpdateMention, 1000 );
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-gray-900 m-0!">
					{ __( 'Social Networks', 'pointwise-summary' ) }
				</h3>
				<p className="text-sm text-gray-600 mt-1">
					{ sprintf(
						__(
							'%1$d of %2$d networks enabled',
							'pointwise-summary'
						),
						enabledCount,
						networks.length
					) }
				</p>
			</div>

			<div className="divide-y divide-gray-200">
				{ networksWithIcons.map( ( network ) => (
					<NetworkRow
						key={ network.id }
						network={ network }
						onToggle={ handleToggleNetwork }
						onMentionChange={ debouncedUpdateMention }
					/>
				) ) }
			</div>
		</div>
	);
};
